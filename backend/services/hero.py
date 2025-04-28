from flask import Flask, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
from sklearn.metrics import accuracy_score
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score



app = Flask(__name__)


@app.route('/run_model', methods=['GET'])
def predictStockPerformance():
    # Load and prepare data
    df = pd.read_csv('data.csv')  
    
    features = df[['open', 'close', 'high', 'low', 'volume']].values
    
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    features = scaler.fit_transform(features)
    
    df['target'] = (df['close'].shift(-1) > df['close'] * 1.02).astype(int)  
    target = df['target'].values[:-1]  
    
    train_size = int(len(features) * 0.65)
    train_features, test_features = features[:train_size], features[train_size:-1]
    train_target, test_target = target[:train_size], target[train_size:]
    
    time_step = 100  # Look-back window
    def create_dataset(features, target, time_step=1):
        dataX, dataY = [], []
        for i in range(len(features) - time_step):
            dataX.append(features[i:(i + time_step), :])
            dataY.append(target[i + time_step - 1])
        return np.array(dataX), np.array(dataY)
    
    X_train, Y_train = create_dataset(train_features, train_target, time_step)
    X_test, Y_test = create_dataset(test_features, test_target, time_step)
    
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(Dropout(0.2))
    model.add(LSTM(50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(50))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation='sigmoid'))  # Sigmoid for binary classification
    
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.summary()
    
    model.fit(X_train, Y_train, validation_data=(X_test, Y_test), epochs=1, batch_size=64, verbose=1)
    
    test_pred = model.predict(X_test)
    test_pred_binary = (test_pred > 0.5).astype(int) 
    test_accuracy = accuracy_score(Y_test, test_pred_binary)
    
    # Return the test accuracy and a sample probability
    return jsonify({
        'test_accuracy': test_accuracy,
        'skyrocket_probability': float(test_pred[-1][0])  # Probability for the last time step in test
    })

@app.route('/predict-mutual-fund', methods=['GET'])
def predict_mutual_fund_performance():
    # Load the data
    data = pd.read_csv("MFData.csv")  # Replace with your file path

    # Convert columns to numeric
    data['vale1'] = data['vale1'].astype(float)
    data['vole'] = data['vole'].astype(float)

    # Feature Engineering
    data['rate_of_change'] = data['vale1'].pct_change()
    data = data.dropna()  # Remove rows with NaN

    # Define the target (1 if `vale1` goes up, 0 otherwise)
    data['target'] = (data['vale1'].shift(-1) > data['vale1']).astype(int)
    data = data.dropna()

    # Select features and scale the data
    features = ['vale1', 'vole', 'rate_of_change']
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data[features])

    # Create sequences for LSTM (look back 5 steps)
    sequence_length = 5
    X = []
    y = []

    for i in range(sequence_length, len(scaled_data)):
        X.append(scaled_data[i-sequence_length:i])  # Past 5 steps as input
        y.append(data['target'].iloc[i])            # Next step as the target

    X = np.array(X)
    y = np.array(y)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Define the LSTM model
    model = tf.keras.Sequential([
        tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])),
        tf.keras.layers.LSTM(50),
        tf.keras.layers.Dense(25, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')  # Output for binary classification
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    # Train the model
    history = model.fit(X_train, y_train, epochs=1, batch_size=32, validation_split=0.2, verbose=1)

    # Evaluate on the test set
    y_pred = (model.predict(X_test) > 0.5).astype(int)  # Convert probabilities to binary
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Test Accuracy: {accuracy:.2f}")

    # Predict for the latest data
    latest_data = scaled_data[-sequence_length:].reshape(1, sequence_length, -1)
    prediction = model.predict(latest_data)

    # Prepare the response
    response = {
        "accuracy": accuracy,
        "prediction": float(prediction[0][0]),  # Convert the prediction to a float for JSON serialization
        "prediction_label": "up" if prediction >= 0.4 else "down"
    }

    return jsonify(response)  # Return JSON response

if __name__ == "__main__":
    app.run(debug=True)
