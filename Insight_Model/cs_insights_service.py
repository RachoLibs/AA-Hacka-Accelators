#!/usr/bin/env python
# coding: utf-8

# In[1]:


import joblib
import numpy as np
from flask_cors import CORS

# In[2]:

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

def findConsentSensitivity(consentType, consentMode, dataRange, frequency, frequencyValue):
   
    test=[LB_FQ.transform([frequency.lower()])[0], LB_CM.transform([consentMode.lower()])[0], LB_CT.transform([consentType.lower()])[0]]
    test_data=np.concatenate((test[0], test[1], test[2], [float(dataRange)],[float(frequencyValue)]))
    result = Sensitivity_Dict[CS_model.predict([test_data])[0]]
    return result


# In[3]:

joblib_file = "Insights_Alert_Model.pkl"
Alert_model = joblib.load(joblib_file)
joblib_file = "lb_purpose.pkl"
LB_Purpose = joblib.load(joblib_file)
joblib_file = "lb_fitype.pkl"
LB_FIType = joblib.load(joblib_file)

def alertWithInsights(purposeCode, purposeText, fiType, dataRange):
   
    
    test=[LB_Purpose.transform([purposeText.lower()])[0], LB_FIType.transform([fiType.lower()])[0]]
    test_data=np.concatenate((test[0], test[1], [float(purposeCode)],[float(dataRange)]))
    result = Alert_model.predict([test_data])[0]
    return result


# In[4]:


from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify


# In[5]:


app = Flask(__name__)
CORS(app)
api = Api(app)


# In[6]:


class ConsentSensitivity(Resource):
    def get(self,consentType, consentMode, dataRange, frequency, frequencyValue):
        result=findConsentSensitivity(consentType, consentMode, dataRange, frequency, frequencyValue)
        return jsonify(result)
        


# In[7]:


class InsightsAlert(Resource):
    def get(self,purposeCode, purposeText, fiType, dataRange):
        result=alertWithInsights(purposeCode, purposeText, fiType, dataRange)
        return jsonify(str(result))
        


# In[8]:


api.add_resource(ConsentSensitivity, '/consentsensitivity/<consentType>/<consentMode>/<dataRange>/<frequency>/<frequencyValue>') # Route_1


# In[9]:


api.add_resource(InsightsAlert, '/insightsalert/<purposeCode>/<purposeText>/<fiType>/<dataRange>') # Route_2


# In[ ]:


if __name__ == '__main__':
     app.run(host= '0.0.0.0',port='5002')

