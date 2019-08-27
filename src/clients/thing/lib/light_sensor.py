#!/usr/local/bin/python

# from: https://pimylifeup.com/raspberry-pi-light-sensor/

import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BOARD)

pin_to_circuit = 7;

def rc_time (pin_to_circuit):
    count = 0

    # Output on the pin for
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)
    time.sleep(0.1)

    # Change the pin back to input
    GPIO.setup(pin_to_circuit, GPIO.IN)

    # Count until the pin goes high
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
        count += 1
        time.sleep(0.0005)

    return count

# Catch when script is interrupted, cleanup correctly
try:
    # Main loop
    while True:
        print rc_time(pin_to_circuit)
        sys.stdout.flush()
except KeyboardInterrupt:
    pass
finally:
    GPIO.cleanup()
