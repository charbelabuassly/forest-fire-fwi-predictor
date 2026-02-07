<div id="top"></div>

<br />
<div align="center">
<h3 align="center">Forest Fire Weather Index Predictor</h3>

  <p align="center">
    Machine Learning Project
  </p>
</div>

### Technologies Used 
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-%23ffffff.svg?style=for-the-badge&logo=Matplotlib&logoColor=black)
![Seaborn](https://img.shields.io/badge/Seaborn-%23444876.svg?style=for-the-badge&logo=python&logoColor=white)

### Tools Used
![Jupyter Notebook](https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)



## About The Project
* Using Data Science and Machine learning, we can build a model that predicts the Fire Weather Index (FWI) based on weather parameters and fire danger indices.
* The project uses the **Algerian Forest Fires Dataset** covering June-September 2012 from two regions in Algeria.
* Built a **Ridge Regression model** to handle multicollinearity in the dataset with log transformation on the target variable.
* Developed a **FastAPI backend** for serving predictions with RESTful endpoints.
* Created a **React frontend** for an interactive user interface.
* **Sklearn** for pre-processing and Model Building.
* Pandas, Numpy, Matplotlib for data processing, cleaning, and visualization.




## Introduction
* The dataset contains forest fire observations and data from two regions of Algeria: the Bejaia region and the Sidi Bel-Abbes region.
* The timeline of this dataset is from June 2012 to September 2012.
* In this project, we focused on predicting the Fire Weather Index (FWI) using weather features and Canadian Forest Fire Weather Index components.
* The dataset contains 244 observations with features including Temperature, Relative Humidity, Wind Speed, Rain, and fire danger indices (FFMC, DMC, DC, ISI).



## Dataset Information

**Source**: Algerian Forest Fires Dataset  
**Time Period**: June 1 - September 30, 2012  
**Regions**: Bejaia and Sidi Bel-abbes, Algeria  
**Total Instances**: 244 observations

**Input Features:**

Weather Parameters:
* Temperature (°C)
* RH - Relative Humidity (%)
* Ws - Wind Speed (km/h)
* Rain - Precipitation (mm)

Fire Danger Indices:
* FFMC - Fine Fuel Moisture Code
* DMC - Duff Moisture Code
* DC - Drought Code
* ISI - Initial Spread Index

**Target Variable:**
* FWI - Fire Weather Index


## Project Workflow

### Data Cleaning
* Loading and preprocessing the dataset using Pandas.
* Handling missing values and outliers.
* Feature engineering and data validation.

### Exploratory Data Analysis
* Comprehensive EDA performed to extract insights from the dataset.
* Identified strong predictors: ISI (r=0.89), FFMC (r=0.87), DMC (r=0.81).
* Detected high multicollinearity between features (BUI & DMC: 0.98, BUI & DC: 0.94).
* Observed seasonality with peak fire activity in August-September.
* Analyzed distribution of features and target variable.
* Data visualization using Matplotlib and Seaborn.

### Model Building
* Evaluated multiple regression algorithms for FWI prediction.
* Models tested: Linear Regression, Lasso Regression, Ridge Regression, Decision Tree.
* Applied log transformation to target variable to handle skewness.
* Created preprocessing pipeline with Ridge Regression.

### Model Selection
* Selected Ridge Regression as the final model due to:
  * High multicollinearity in features requiring regularization
  * Better handling of correlated features with L2 regularization
  * Improved generalization performance
* Model saved as pipeline using joblib for deployment.
* R2 score and cross-validation metrics used for model evaluation.

### Backend Development (FastAPI)
* Created FastAPI application for serving predictions.
* Implemented three endpoints:
  * `/health` - API health check
  * `/predict` - Get FWI predictions from input features
  * `/model_info` - Retrieve model information
* Added CORS middleware for React frontend integration.
* Loaded pre-trained Ridge pipeline for inference.

### Frontend Development (React)
* Built interactive React application for user input.
* Form validation for all required weather and fire danger parameters.
* Real-time prediction display with error handling.
* Axios for API communication with backend.
* Reset functionality to clear inputs.
* Responsive design with clean UI.


## Installation and Setup

### Prerequisites
* Python 3.8 or higher
* Node.js 14 or higher
* npm package manager

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/charbelabuassly/forest-fire-fwi-predictor.git
cd forest-fire-fwi-predictor
```

2. Install Python dependencies
```bash
pip install fastapi uvicorn joblib pandas numpy scikit-learn
```

3. Ensure the trained model file exists at `model/ridge_pipeline.joblib`

4. Start the FastAPI server
```bash
uvicorn server:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Create React application (if not already created)
```bash
npx create-react-app frontend
cd frontend
```

2. Install Axios for API calls
```bash
npm install axios
```

3. Copy the `App.js` file to `src/App.js`

4. Start the React development server
```bash
npm start
```

The application will open at `http://localhost:3000`


## API Documentation

### Endpoints

**1. Health Check**
```
GET /health
```
Response:
```json
{
  "status": "ok"
}
```

**2. Get Prediction**
```
POST /predict
```
Request Body:
```json
{
  "Temperature": 25.5,
  "RH": 60,
  "Ws": 15,
  "Rain": 0,
  "FFMC": 85,
  "DMC": 20,
  "DC": 100,
  "ISI": 5
}
```
Response:
```json
{
  "prediction": 12.34
}
```

**3. Get Model Information**
```
GET /model_info
```
Response:
```json
{
  "model": "RidgeRegression",
  "Features": ["Temperature", "RH", "Ws", "Rain", "FFMC", "DMC", "DC", "ISI"],
  "framework": "scikit-learn",
  "trained-on": "Algerian Forest Fire Dataset",
  "target": "FWI"
}
```

### Testing the API

You can test the API using Postman:
1. Open Postman and create a new POST request to `http://127.0.0.1:8000/predict`
2. Set the request body to JSON format
3. Add the required parameters as shown in the example above
4. Send the request to get the FWI prediction


## Key Findings from EDA

**Distribution Analysis:**
* FWI shows right-skewed distribution requiring log transformation
* Most features show reasonable distributions with some outliers

**Correlation Insights:**
* Strong predictors identified: ISI (r=0.89), FFMC (r=0.87), DMC (r=0.81)
* Weak predictors: Wind Speed (r=0.02)
* High multicollinearity detected between BUI, DMC, and DC

**Temporal Patterns:**
* Peak fire activity observed in July and August
* Seasonality plays significant role in fire occurrence

**Weather Impact:**
* Highest fire counts between 31-36°C temperature range
* FFMC values > 75 indicate higher fire risk
* Significant fires occur on dry days with minimal rainfall

**Model Implications:**
* Ridge Regression recommended due to multicollinearity
* Log transformation essential for target variable
* Feature selection needed to handle redundant variables



## Acknowledgments
* Algerian Forest Fires Dataset
* Canadian Forest Fire Weather Index System
* FastAPI and React communities
* Kaggle


---

**Note**: This project was built as a learning exercise to demonstrate my understanding of the complete machine learning workflow, from data analysis to model deployment and full-stack application development.
