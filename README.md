# AI Smart Tourism Crowd Management System

## Overview

AI Smart Tourism Crowd Management System is a full-stack web application that predicts pedestrian crowd density at tourist locations using machine learning and provides intelligent travel recommendations through an interactive map.

The application combines crowd forecasting, location visualization, weather insights, and smart advisory generation to help tourists choose the best time to visit popular destinations.

---

## Features

- Interactive map visualization using React Leaflet
- Crowd prediction using an XGBoost machine learning model
- Risk-level classification (Low, Medium, High, Critical)
- Smart advisory generation based on crowd and weather conditions
- PostgreSQL database integration
- REST API built with FastAPI

---

## Technology Stack

### Frontend
- React
- Vite
- React Leaflet
- Axios

### Backend
- FastAPI
- Python
- PostgreSQL
- SQLAlchemy
- Pandas
- XGBoost

---

## Project Structure

```
smart-tourism-ai/
├── app/
├── data/
├── ml_models/
├── requirements.txt

smart-tourism-ui/
├── src/
├── public/
├── package.json
```



---

## Future Enhancements

- Real-time crowd data integration
- User authentication
- Mobile application support
- Route optimization
- Live event integration

---
## Dataset

The original dataset is larger than GitHub's file size limit and is therefore not included in this repository.

Dataset used:
- pedestrian-counting-system-monthly-counts-per-hour.csv

Place the dataset inside:

```text
smart-tourism-ai/data/
```

before running the application.

## Authors

**Team Members**

1. Angelin A
2. Divya Dharshini D
3. Fastina S
