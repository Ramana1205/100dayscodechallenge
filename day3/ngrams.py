import nltk
from nltk.util import ngrams

# Take user input for the text
text = input("Enter the text: ")

# Tokenize the text into words
words = nltk.word_tokenize(text)

# Take user input for the desired n-gram size
n = int(input("Enter number of n grams: "))

# Generate n-grams
ngrams_output = list(ngrams(words, n))
print("Original text:")
print(text)

# Print the generated n-grams
for gram in ngrams_output:
    print(gram)