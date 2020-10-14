import zmq
import time
import json

from core import calculator

addr = 'tcp://127.0.0.1:5555'
ctx = zmq.Context()
socket = ctx.socket(zmq.REP)
socket.bind(addr)

class NoCommandError(Exception):
    pass

class ProgramExit(Exception):
    pass

def process_message(message):
    data = json.loads(message)
    command = data["command"]
    args = data.get("args", [])
    if hasattr(calculator, command):
        func = getattr(calculator, command)
        ret = func(*args)
        return {"result": ret}
    elif command == "Exit":
        raise ProgramExit
    else:
        raise NoCommandError(f"No such command : '{command}'")

def main():
    while True:
        message = socket.recv_string()
        try:
            ret = process_message(message)
            ret = json.dumps(ret)
            socket.send(ret.encode()) 
        except NoCommandError:
            continue
        except ProgramExit:
            break

if __name__ == "__main__":
    main()