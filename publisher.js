var q = 'tasks';  

function bail(err) { 
    console.error(err); 
    process.exit(1); 
}   // Publisher 
function publisher(conn) { 
    conn.createChannel(on_open); 

    function on_open(err, ch) { 
        if (err != null) bail(err); 
        ch.assertQueue(q, {
            durable: true
        }, function(err, _ok) { 
            ch.sendToQueue(q, new Buffer('something to do')); 
        }); 
    } 
}  
require('amqplib/callback_api') .connect('amqp://localhost', function(err, conn) { 
    if (err != null) bail(err); 
    publisher(conn); 
});