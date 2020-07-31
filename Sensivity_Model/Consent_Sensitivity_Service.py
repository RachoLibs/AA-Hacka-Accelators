#!/usr/bin/env python
# coding: utf-8

# In[8]:


import joblib
import numpy as np


# In[9]:


def findConsentSensitivity(consentType, consentMode, dataRange, frequency, frequencyValue):
    joblib_file = "Consent_Sensitivity_Model.pkl"
    CS_model = joblib.load(joblib_file)
    joblib_file = "lb_consent_type.pkl"
    LB_CT = joblib.load(joblib_file)
    joblib_file = "lb_consent_mode.pkl"
    LB_CM = joblib.load(joblib_file)
    joblib_file = "lb_frequency.pkl"  
    LB_FQ = joblib.load(joblib_file)
    joblib_file = "sensitivity_dict.pkl"
    Sensitivity_Dict=joblib.load(joblib_file)
    test=[LB_FQ.transform([frequency.lower()])[0], LB_CM.transform([consentMode.lower()])[0], LB_CT.transform([consentType.lower()])[0]]
    test_data=np.concatenate((test[0], test[1], test[2], [float(dataRange)],[float(frequencyValue)]))
    result = Sensitivity_Dict[CS_model.predict([test_data])[0]]
    return result


# In[10]:


from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify


# In[11]:


app = Flask(__name__)
api = Api(app)


# In[12]:


class ConsentSensitivity(Resource):
    def get(self,consentType, consentMode, dataRange, frequency, frequencyValue):
        result=findConsentSensitivity(consentType, consentMode, dataRange, frequency, frequencyValue)
        return jsonify(result)
        


# In[13]:


api.add_resource(ConsentSensitivity, '/consentsensitivity/<consentType>/<consentMode>/<dataRange>/<frequency>/<frequencyValue>') # Route_1


# In[14]:


if __name__ == '__main__':
     app.run(host= '0.0.0.0',port='5002')


# In[ ]:




