# Define stop words
stop_words = ["a", "an", "the", "is", "and", "are", "that", "from", "because", "do", "not", "etc."]

# Take user input for text
text = input("Enter the text: ")

# Tokenize the text
words = text.split()

# Remove stop words
filtered_words = [word for word in words if word.lower() not in stop_words]

# Join the filtered words back into a sentence
filtered_text = ' '.join(filtered_words)

# Print the original text and text after stop word removal
print("Original Text:")
print(text)

print("\nText after Stop Word Removal:")
print(filtered_text)