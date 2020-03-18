"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """
        Class that populate a list of words from a file specified.
    """
    def __init__ (self, path):
        """
        Creates a list of words from specified file.
        """
        self.file = path
        self.readfile()
    
    def readfile(self):
        """
        Reads each line of specified file and generates a list of all the words contained in the file
        """
        file = open(self.file,'r')
        self.words = file.readlines()
        file.close()
        print(f'{len(self.words)} words read.') 

    def random(self):
        """
        Selects a random word from the file specified.
        """
        word = random.choice(self.words)
        return word.rstrip()

class SpecialWordFinder(WordFinder):

    def __init__(self, path):

        super().__init__(path)
    
    def readfile(self):
        """
        Parses file specified and appends words to words list leaving out comments # and new lines.
        """
        file = open(self.file, 'r')
        self.words = []
        for line in file.readlines():
            if not (len(line.strip()) == 0 or line[0] == '#'):
                self.words.append(line)
        file.close()
                
        

