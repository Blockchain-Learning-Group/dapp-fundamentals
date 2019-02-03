import sys, os

sys.path.append(os.path.abspath('./course-content'))

def setup(sphinx):
    from SolidityLexer import SolidityLexer
    sphinx.add_lexer('Solidity', SolidityLexer())

source_suffix = '.rst'
master_doc = 'index'
project = 'Blockchain Learning Group DApp Fundamentals'
copyright = '2019 Blockchain Learning Group Inc.'
highlight_language = 'Solidity'
