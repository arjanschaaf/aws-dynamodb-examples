const REGION = "us-west-2";
// I am using the DynamoDB low level because the DocClient does not support executeStatement used with PartiQL
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

// Create low level client
const dbclient = new DynamoDB({ region: REGION });

// DynamoDB injection is possible with statements where conditions such as - greater than whitespace (' ') or special chars ('*')
let param1 = { Statement: `SELECT * FROM "copa-america" WHERE "pk" > ' ' `}
let param2 = { Statement: `SELECT * FROM "copa-america" WHERE "pk" > '*' `}

const executePartiQLStatement = async (params) => {
    return data = await dbclient.executeStatement(params);
}

executePartiQLStatement(param1)
    .then((data) => {
            //Iterate through the Items array returned in the data variable and then unmarshall the DynamoDB JSON format to "regular" json format.
            data.Items.forEach(function (item) {
                console.log(JSON.stringify(unmarshall(item), null, 2));
            });
        }
    )
    .catch((error) => console.error(JSON.stringify(error, null, 2)));

executePartiQLStatement(param2)
    .then((data) => {
            //Iterate through the Items array returned in the data variable and then unmarshall the DynamoDB JSON format to "regular" json format.
            data.Items.forEach(function (item) {
                console.log(JSON.stringify(unmarshall(item), null, 2));
            });
        }
    )
    .catch((error) => console.error(JSON.stringify(error, null, 2)));
