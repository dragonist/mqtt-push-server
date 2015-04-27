var mqtt = require('mqtt'); 
var connection = mqtt.connect('mqtt://localhost'); 
var q = 'tasks'; 

function bail(err) { 
    console.error(err); 
    process.exit(1); 
} 
// Consumer 
function consumer(conn) { 
    var ok = conn.createChannel(on_open); 

    function on_open(err, ch) { 
        if (err != null) bail(err); 
        ch.assertQueue(q, {
            durable: true
        }, function(err, _ok) { 
            ch.consume(q, function(msg) { 
                if (msg !== null) { 
                    console.log(msg.content.toString()); 
                    connection.publish('hello', msg.content.toString(), {
                        qos: 2
                    }); 
                    ch.ack(msg); 
                } 
            }); 
        }); 
    } 
} 
require('amqplib/callback_api') 
    .connect('amqp://localhost', function(err, conn) { 
        if (err != null) bail(err); 
        consumer(conn); 
    });