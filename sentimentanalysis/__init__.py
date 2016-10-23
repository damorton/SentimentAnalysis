from flask import Flask, jsonify, json
from flask import request
import pickle
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return 'Sentiment Analysis service is online'

@app.route('/api/analyse', methods=['POST', 'GET'])
def sentiment_analysis():
    # Load pickled objects instead of retraining them every time
    count_vectorizer = pickle.load(open("count_vectorizer.pkl", "rb"))
    classifier = pickle.load(open("sentiment_classifier.pkl", "rb"))

    comment = []
    # Test Phase
    if request.method == 'POST':
        value = request.json['review']
        #comment = ['this movie was so bad']
    if request.method == 'GET':
        value = request.args['review']
        #comment = ['this movie was so bad']

    comment.append(value)
    labelResult = classifier.predict(count_vectorizer.transform(comment))

    if labelResult[0] == '1':
        reviewSentiment = 'Positive'
    else:
        reviewSentiment = 'Negative'

    return jsonify(comment, reviewSentiment)
