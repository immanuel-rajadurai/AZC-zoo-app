const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { name, incrementBy } = event.arguments;

  // Fetch the table name from the environment variable
  const tableName = process.env.OCCURRENCECOUNTERTABLE_NAME;

  if (!tableName) {
    throw new Error("DynamoDB table name is not set in environment variables");
  }

  try {
    const params = {
      TableName: tableName,
      Key: { name },
      UpdateExpression: "SET #count = if_not_exists(#count, :start) + :inc",
      ExpressionAttributeNames: {
        "#count": "count", // Use this to safely reference the "count" attribute
      },
      ExpressionAttributeValues: {
        ":start": 0, // Initialize count to 0 if it doesn't exist
        ":inc": incrementBy, // Increment by the provided value
      },
      ReturnValues: "ALL_NEW", // Return the updated item
    };

    const result = await docClient.update(params).promise();
    return result.Attributes;
  } catch (error) {
    console.error("DynamoDB update error:", error);
    throw new Error(error.message);
  }
};