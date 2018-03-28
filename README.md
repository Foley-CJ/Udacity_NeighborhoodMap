# Udacity_NeighborhoodMap
<h1>Project Capstone: Udacity Full stack - frontend component </h1>


This project can be run using the command "python main.py"  This will initialize
a local instance of the web app running on port 5001.

This project is built on python 2.7 and leverages the following packages:

  *  Flask == 0.11.1
  *  requests == 2.11.1
  *  urllibs - default


This project only depends upon two javascript libraries, which are sourced as follows:

  *  knockoutjs - loaded via resource link
  *  jquery - min file stored

This project also depends on the usage of two prominent apis.
  *  google maps 
      *  This api is accessed via custom javascript defined in the custom.js file
  *  yelp v3 business search  
      * This api is accessed via python's urllib package through the yelp_query function in the main.py 

In the event of a failed yelp api call the program will continue to function and instead display default additional marker information.



