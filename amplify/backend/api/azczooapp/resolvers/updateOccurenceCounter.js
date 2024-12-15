const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { name } = event.arguments;
    let params;

    if (event.fieldName === 'incrementOccurenceCounter') {
        params = {
            TableName: process.env.TABLE_NAME,

            Key: {
                id
            },

            UpdateExpression: 'SET #count = #count + :val',

            ExpressionAttributeNames: {
                '#count': 'count'
            },

            ExpressionAttributeValues: {
                ':val': 1
            }
        };
    }

    const result = await dynamodb.update(params).promise();
}