import nltk 
from nltk.stem import PorterStemmer 
from nltk.tokenize import word_tokenize 
# Download NLTK punkt data 
nltk.download('punkt') 
# Take user input for text 
text = input("Enter the text: ") 
# Tokenize the text 
tokens = word_tokenize(text) 
# Initialize Porter Stemmer 
porter = PorterStemmer() 
# Apply stemming to each token 
stemmed_tokens = [porter.stem(token) for token in tokens] 
# Join the stemmed tokens back into a sentence 
stemmed_text = ' '.join(stemmed_tokens) 
# Print the original text and text after stemming 
print("Original Text:") 
print(text) 
print("\nText after Stemming:") 
print(stemmed_text) 
