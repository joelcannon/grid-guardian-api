# LoRaWAN

LoRaWAN radios are part of a low-power, wide-area network (LPWAN) technology that enables long-range communication between IoT devices and gateways. Here's how data from LoRaWAN radios might be stored in a database:

# Gateway

- **Gateway ID:** A unique identifier for the gateway within the network.
- **Location:** The physical location of the gateway, often represented as latitude and longitude coordinates.
- **Description:** A description or name for the gateway to identify its purpose or location.
- **Frequency Plan:** The frequency plan used by the gateway to communicate with devices.
- **Data Rate:** The data rate at which the gateway communicates with devices.
- **Channel Configuration:** Information about the channels supported by the gateway for communication with devices.
- **Status:** The status of the gateway (e.g., active, inactive, offline).
- **Last Seen Timestamp:** The timestamp indicating when the gateway was last seen or communicated with devices.
- **Connected Nodes:** Information about the nodes that are connected to the gateway.
- **Metadata:** Additional metadata or configuration information specific to the gateway.

```js
{
  _id: ObjectId("..."),
  gatewayId: "1234567890",
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  description: "Main Street Gateway",
  frequencyPlan: "EU868",
  dataRate: "SF7BW125",
  channelConfiguration: ["0-7"],
  status: "active",
  lastSeenTimestamp: "2022-03-24T10:00:00Z",
  connectedNodes: [
    {
      nodeId: "node1",
      status: "connected"
    },
    {
      nodeId: "node2",
      status: "disconnected"
    }
  ],
  metadata: {
    antennaType: "omni-directional",
    antennaGain: 5.0,
    powerOutput: 1.0,
    firmwareVersion: "1.2.3",
    hardwareVersion: "A",
    manufacturer: "Acme Corp",
    model: "XYZ-123",
    ipAddress: "192.168.1.100"
    installationDate: "2022-01-01",
    notes: "Gateway installed on rooftop."
  }
}
```

# Device

- **Device ID:** Each device connected to the LoRaWAN network has a unique identifier (DevEUI).
- **Location:** The location of the device containing the sensors.
- **Gateway ID:** Similarly, each gateway in the network has a unique identifier (Gateway ID).
- **Timestamp:** The timestamp of when the data was received or transmitted by the gateway.
- **Payload:** The actual data transmitted by the device, which could include sensor readings, status updates, or other information.
- **Connected Sensors:** Information about the sensors that are connected to the gateway.
- **Signal Strength:** Information about the signal strength of the transmission, which can be used to determine the quality of the connection.
- **Frequency and Bandwidth:** Information about the frequency and bandwidth used for the transmission.
- **Data Rate:** The data rate at which the transmission occurred, which can affect the range and speed of communication.
- **Channel:** The specific channel used for the transmission, as LoRaWAN supports multiple channels for communication.

```js
{
  _id: ObjectId("..."),
  deviceID: "0011223344556677",
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  }
  gatewayID: "1234567890",
  timestamp: "2022-03-15T12:00:00Z",
  payload: "AQIDBAUGBwg",
  connectedSensors: [
    {
      sensorId: ObjectId("..."),
      type: "Temperature",
      timestamp: ISODate("2022-03-15T12:00:00Z"),
      value: 25.5,
      unit: "°C",
      status: "Normal",
    },
    {
      sensorId: ObjectId("..."),
      type: "Voltage"
      timestamp: ISODate("2022-03-15T12:00:00Z"),
      value: 220,
      unit: "v",
      status: "Normal",
    }
  ],
  signalStrength: "-120 dBm",
  frequency: "868.1 MHz",
  bandwidth: "125 kHz",
  dataRate: "SF7BW125",
  channel: "0",
}
```

# Sensor

- **\_id:** Unique identifier for the sensor.
- **name:** Name or description of the sensor.
- **type:** Type of sensor (e.g., temperature, humidity, pressure).
- **location:** Physical location of the sensor.
- **status:** Status of the sensor (e.g., active, inactive, faulty).
- **Device ID:** Each sensor is connected to a device.
- **metadata:** Additional metadata about the sensor (e.g., manufacturer, model, installation date).

```js
{
  _id: ObjectId("..."),
  deviceID: "0011223344556677",
  name: "Temperature Sensor",
  type: "Temperature",
  location: { type: "Point",
    coordinates: [longitude, latitude] },
  status: "Active",
  deviceId: ObjectId("..."),
  metadata: { manufacturer: "ABC Inc.",
    model: "1234",
    installation_date: "2022-03-01" }
}
```

# Sensor Reading

- **\_id:** Unique identifier for the sensor reading.
- **sensor_id:** Identifier linking the reading to a specific sensor.
- **timestamp:** Date and time when the reading was recorded.
- **value:** Value measured by the sensor (e.g., temperature value, humidity value).
- **unit:** Unit of measurement for the value (e.g., Celsius, Fahrenheit, percentage).
- **status:** Status of the reading (e.g., normal, warning, error).
- **metadata:** Additional metadata about the reading (e.g., battery level, signal strength).

```js
{
  _id: ObjectId("..."),
  sensor_id: ObjectId("..."),
  timestamp: ISODate("2022-03-15T12:00:00Z"),
  value: 25.5,
  unit: "°C",
  status: "Normal",
  metadata: { battery_level: 90 }
}
```

# Sensor Units

Store all values using metric units and convert as needed on the front end.

```js
const SensorUnits = {
  TEMPERATURE: {
    CELSIUS: '°C',
  },
  VOLTAGE: {
    VOLTS: 'V',
  },
  BATTERY_PERCENTAGE: {
    PERCENT: '%',
  },
  INCLINE_ANGLE: {
    DEGREES: '°',
  },
  ACCELEROMETER: {
    METERS_PER_SECOND_SQUARED: 'm/s²',
  },
  LOUD_NOISE: {
    DECIBELS: 'dB',
  },
  LIGHT: {
    LUX: 'lux',
  },
}
```

# Threshold

- **\_id:** Unique identifier for the threshold document.
- **sensorId:** Identifier for the sensor within the device.
- **deviceId:** Identifier for the device to which the threshold applies.
- **gatewayId:** Identifier for the gateway that the device is connected to.
- **thresholdType:** Type of threshold (e.g., max, min, delta).
- **thresholdStatus:** Status of threshold (e.g., warning, emergency, etc).
- **thresholdValue:** Threshold value for the sensor.
- **thresholdUnit:** Unit of measurement for the threshold value (e.g., F for Fahrenheit).
- **timestamp:** Timestamp when the threshold was set.

```js
{
    _id: ObjectId("60d5ec9af682fbd12a892c99"),
    sensorId: "A",
    deviceId: "0011223344556677",
    gatewayId: "1234567890",
    thresholdType: "max",
    thresholdStatus: "warning",
    thresholdValue: 150,
    thresholdUnit: "°C",
    createdTimestamp: ISODate("2022-03-15T12:00:00Z")
    updatedTimestamp: ISODate("2022-03-15T12:00:00Z")
}
```
