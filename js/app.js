'use strict';

//все внутри самовызывающей функции чтоб не быть в global scope
(function () {
    let $input = $("input[name='user-message']");

    function sound()  {
        let sounds = [
          './sounds/05101.mp3',
          './sounds/05102.mp3',
          './sounds/05103.mp3',
          './sounds/05104.mp3',
          './sounds/05105.mp3',
        ];

       let src =  GetRandom(sounds.length);
       let beep = new Audio(sounds[src]);
       beep.volume = 0.2;
       beep.play();
    }

    function GetRandom(length) {
       return (Math.floor(Math.random() * (Math.floor(length-1) - 0  + 1)) + 0)
    }

    //аготовленные фразы
    function phrasesGenerator (){
        let phrases = [
            "Hello there username!",
            "Luke, i'm your father",
            "There is a difference",
            "Functional categories",
            "Buenos días, Esteban. ¿Cómo estás?",
            "All good",
            "How about you?",
        ];
        let randomDigit = GetRandom(phrases.length);
        // console.log(randomDigit);
        return phrases[randomDigit];
    }





    //условие сообщения от бота
    async function botSendMessage(){
        $('.send-btn').prop("disabled", true);
        $input.prop("disabled", true);
        setTimeout(function () {
            let botMessage = $('<div>', {
                class: 'layout-bot-message',
            }).text(phrasesGenerator());
            sound();
            $('.text-container').append('<div class="bot">R2D2:</div>');
            $('.text-container').append(botMessage);
            $('.send-btn').prop("disabled", false);
            $input.prop("disabled", false);
            }, 2000);
    }

    //условия для сообщений от юзера
    async function userSendMessage (){
        if ($input.val().length > 0 && $input.val() !== "End" && $input.val() !== "end"){
            let message = $('<div/>', {
                class: 'layout-user-message',
            }).text($input.val());
            $('.text-container').append('<div class="user">User:</div>');
            $('.text-container').append(message);
            await botSendMessage();
        } else if ($input.val() === "End" || $input.val() === "end"){
            $input.val('');
            $('.text-container').append('<div>Chat gone! Good Bye!</div>');
            // $('.send-btn').prop("disabled", true);
            $('.send-btn').prop("disabled", true);
            clearInterval(timer);
        } else if ($input.val().length === 0){
            $('.send-btn').prop("disabled", false);
            $('.text-container').append('<div>You enter nothing</div>');
        }
    }

    //отправка сообщениея по enter
    $input.keypress(function(e) {
        if(e.which === 13) {
            $('.send-btn').click();
        }
    });

    //отправка сообщениея по клику кнопки
    $('.send-btn').click(async function () {
        await userSendMessage();
    });

    //таймер отключения чата 25 - 60 се
    let second = Math.floor(Math.random() * (Math.floor(60) - 25  + 1)) + 25;
    let timer = setInterval(function(){
        --second;
        $('.time').html("Chat end in: " +second+" sec");
        if(second === 0){
            clearInterval(timer);
            $('.text-container').append('<div>Chat gone! Good Bye!</div>');
            $('.send-btn').prop("disabled", true);
            $input.prop("disabled", true);
        }
    }, 1000);


})();

