var amqp = require('amqplib/callback_api');

var rabbitmq_user = process.argv[0];
var rabbitmq_passw = process.argv[1];
var rabbitmq = process.argv[2];

function start() {
    amqp.connect('amqp://'+rabbitmq_user+':'+rabbitmq_passw+'@'+rabbitmq, function(err, conn) {
        conn.createChannel(function(err, channel) {
            var ex='logs';

            channel.assertExchange(ex, 'fanout', {durable:false});
            var queueNombre = process.argv[3];

            channel.assertQueue(queueNombre, {exclusive:true}, function(error, q) {
                channel.bindQueue(q.queue, ex, queueNombre);

                channel.consume(q.queue, function(mensaje) {
                    console.log("%s", mensaje.content.toString());
                }, {noAck:true});
            });
        })
    });
}

start();

