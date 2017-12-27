from sha3 import keccak_256
import sys
import time


def mine_block(difficulty):
    target = 2**256 // difficulty

    # Randomly guess numbers
    for i in range(1000000):
        print('Trying: ', i)

        # Generate the hash and see if you have found the answer
        hashed_value = keccak_256(bytes(i)).digest()
        int_hash = int.from_bytes(hashed_value, byteorder='big')  # conver to int to compare against target

        # Answer found return the solution
        if int_hash <= target:
            print('\n\nBlock found!! The solution is:', i)
            return int_hash

    return bytes(0)


# Timer to measure mining vs. validating
class Timer:
    def __enter__(self):
        self.start = time.clock()
        return self

    def __exit__(self, *args):
        self.end = time.clock()
        self.interval = self.end - self.start


if __name__ == '__main__':
    # The answer for the next block is presented to all miners
    difficulty = int(sys.argv[1])
    target = 2**256 // difficulty

    # Pad the number to 32 bytes, 64 hex, withe leading 0x
    print('New block target:', '{0:#0{1}x}'.format(target, 66))

    # Miners race to find the solution
    with Timer() as t:
       solution = mine_block(difficulty)

    mining_time = t.interval

    # All nodes in the network then validate this solution
    with Timer() as t:
        is_valid = target >= solution

    if is_valid:
        validating_time = t.interval
        print('Block Target:', '{0:#0{1}x}'.format(target, 66))
        print('Solution:    ', '{0:#0{1}x}'.format(solution, 66))
        print('Mining the block took %.09f sec.' % mining_time)
        print('Validating the block solution took %.09f sec.' % validating_time)
        print('Mining took %.00f times longer!' % (mining_time / validating_time))

    else:
        print('Not a valid solution!')
