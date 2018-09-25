var amqp = require('amqplib/callback_api');
var consumer = process.env.RABBITMQ_PORT_5672_TCP_ADDR || "amqp://localhost";

amqp.connect(consumer, (err, conn)=>{
    conn.createChannel(function(err, ch){

        ch.assertQueue(q, {durable: false});
        console.log('[*] Mensajes: %s.', q);

        ch.consume(q, function(msg){
            console.log("[x] %s", msg.content.toString());
        }, {noAck:true});
    });
})