import sha3
import time


def mine_block(block_answer):
    print('Next block answer:', block_answer)

    # Randomly guess numbers
    for i in range(100000):
        print('\nTrying: ', i)

        # Generate the hash and see if you have found the answer
        hashed_value = sha3.sha3_256(bytes(i)).hexdigest()

        print('Hash: ', hashed_value)

        # Answer found return the solution
        if hashed_value == block_answer:
            print('\n\nBlock found!! The solution is:', i)
            return bytes(i)

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
    next_block_answer = b'f4f3a029e3f146b98b5c8464ec07c7d6113288823a58c63711af4491b7160f41'

    # Miners race to find the solution
    with Timer() as t:
        solution = mine_block(next_block_answer)

    mining_time = t.interval
    print('Mining the block took %.09f sec.' % mining_time)

    # All nodes in the network then validate this solution
    with Timer() as t:
        is_valid = next_block_answer == sha3.sha3_256(solution).hexdigest()

    if is_valid:
        validating_time = t.interval
        print('Validating the block solution took %.09f sec.' % validating_time)
        print('Mining took %.00f times longer!' % (mining_time / validating_time))

    else:
        print('Not a valid solution!')
