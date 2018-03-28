from flask import (Flask, render_template, request)
import requests
from urllib import quote

app = Flask(__name__, template_folder="templates")

@app.route("/")
def hello():
    return render_template('index.html')


import json


@app.route("/yelp", methods = ['POST'])
def worker():
    data = request.get_json()
    print("post sent: ", data['lat'], data['lng'])
    try:
        yelpResponse = yelp_query(data['lat'], data['lng'])
    except:
        yelpResponse = {'rating': 'unknown',
                        'image': 'https://vignette.wikia.nocookie.net/canadians'
                                 '-vs-vampires/images/a/a4/'
                                 'Not_available_icon.jpg/revision/'
                                 'latest?cb=20130403054528',
                        'cuisine': 'unknown'}
    return json.dumps(yelpResponse)





def yelp_query(lat, long):

    api_key = "CzbQs9vTEd0_catRjf3HMwr1QDfi4zeuTlezCPq_gNxCDXyjneowe" \
              "Rhe8krEz8ulMooOOWQU7rJmKPSe383d4m_Q" \
              "VVQOW9SGqBwg0UgiJJdvKNApR2KBWW8lWpO2WnYx"
    host = 'https://api.yelp.com'
    path = '/v3/businesses/search'

    url = '{0}{1}'.format(host, quote(path.encode('utf8')))


    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    url_params = {
        'latitude': str(lat),
        'longitude': str(long),
        'limit': 1
    }


    response = requests.request('GET', url, headers=headers, params=url_params)

    firstDataSet = response.json().get('businesses')[0]
    print "=================================="
    rating = firstDataSet.get('rating')
    image = firstDataSet.get('image_url')
    cuisine = firstDataSet.get('categories')[0].get('title')
    print "=================================="
    return {'rating': rating, 'image': image, 'cuisine': cuisine}







if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5001)