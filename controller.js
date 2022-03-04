var html_page2 = `<div class='head_calc'><input type="hidden" id="save_chapter"/><h4 class="animate__animated animate__fadeIn">Início da leitura</h4><div class="animate__animated animate__fadeIn"></div></div><div class='body_calc'><span class="animate__animated animate__fadeIn">Selecione</span><select id='book' class="animate__animated animate__fadeIn" onchange='load_chapthers(this.value)'><option disabled selected>ESCOLHA O LIVRO</option><optgroup></optgroup><option value='0'>Gênesis</option><option value='1'>Êxodo</option><option value='2'>Levítico</option><option value='3'>Números</option><option value='4'>Deuteronômio</option><option value='5'>Josué</option><option value='6'>Juízes</option><option value='7'>Rute</option><option value='8'>1ª Samuel</option><option value='9'>2ª Samuel</option><option value='10'>1ª Reis</option><option value='11'>2ª Reis</option><option value='12'>1ª Crônicas</option><option value='13'>2ª Crônicas</option><option value='14'>Esdras</option><option value='15'>Neemias</option><option value='16'>Ester</option><option value='17'>Jó</option><option value='18'>Salmos</option><option value='19'>Provérbios</option><option value='20'>Eclesiastes</option><option value='21'>Cântico dos Cânticos</option><option value='22'>Isaías</option><option value='23'>Jeremias</option><option value='24'>Lamentações de Jeremias</option><option value='25'>Ezequiel</option><option value='26'>Daniel</option><option value='27'>Oseias</option><option value='28'>Joel</option><option value='29'>Amós</option><option value='30'>Obadias</option><option value='31'>Jonas</option><option value='32'>Miquéias</option><option value='33'>Naum</option><option value='34'>Habacuque</option><option value='35'>Sofonias</option><option value='36'>Ageu</option><option value='37'>Zacarias</option><option value='38'>Malaquias</option><optgroup></optgroup><option value='39'>Matheus</option><option value='40'>Marcos</option><option value='41'>Lucas</option><option value='42'>João</option><option value='43'>Atos</option><option value='44'>Romanos</option><option value='45'>1ª Coríntios</option><option value='46'>2ª Coríntios</option><option value='47'>Gálatas</option><option value='48'>Efésios</option><option value='49'>Filipenses</option><option value='50'>Colossenses</option><option value='51'>1ª Tessalonicenses</option><option value='52'>2ª Tessalonicenses</option><option value='53'>1ª Timóteo</option><option value='54'>2ª Timóteo</option><option value='55'>Tito</option><option value='56'>Filemon</option><option value='57'>Hebreus</option><option value='58'>Tiago</option><option value='59'>1ª Pedro</option><option value='60'>2ª Pedro</option><option value='61'>1ª João</option><option value='62'>2ª João</option><option value='63'>3ª João</option><option value='64'>Judas</option><option value='65'>Apocalipse</option></select><select id='chapter' class="animate__animated animate__fadeIn" disabled onchange='calc_time(this.value)'><option disabled selected>ESCOLHA O CAPÍTULO</option></select></div><div id="feedback" class='feedback'></div><button title="Voltar" type="button" onclick="click_previous()" class="button_format" id="button_page_2"><i class="bi bi-arrow-left-circle"></i>&nbsp; Voltar</button>`;
var html_page1 = `<div class='head_calc'><h4 class="animate__animated animate__fadeIn">Capítulos diários</h4><div class="animate__animated animate__fadeIn"></div></div><div class="roll_select"><div class="roll"><input id="next" class="animate__animated animate__fadeIn" disabled value="6"/><input id="current" class="animate__animated animate__fadeIn" disabled value="5"/><input id="previous" class="animate__animated animate__fadeIn" disabled value="4"/></div><i title="Aumentar" id="up" onclick="up()" class="bi bi-arrow-up-circle animate__animated animate__fadeIn"></i><i title="Diminuir" onclick="down()" id="down" class="bi bi-arrow-down-circle  animate__animated animate__fadeIn"></i></div><button title="Próximo" type="button" onclick="click_next()" class="button_format" id="button_page_1"><i class="bi bi-check2"></i>&nbsp;Próximo</button>`;
var all_chapters = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22];

function load_chapthers(value){
    $('#chapter').empty().append("<option disabled selected>ESCOLHA O CAPÍTULO</option><optgroup></optgroup>");
    document.getElementById('chapter').disabled = false;

    for (var i = 1; i <= all_chapters[value]; i++) $('#chapter').append("<option value="+i+">Capítulo "+i+"</option>");
}

function calc_time(chapter_start){
    var days = days_end_year();
    var chapters_day = document.getElementById('save_chapter').value;
    var chapters = sum_chapters(document.getElementById('book').value, (chapter_start - 1)); /* subtract 1 because the user hasn't read the current chapter yet */
    var date = new Date();

    var condition = Math.ceil(chapters/chapters_day);

    if(condition <= days){
        var date_end = calculate_date_end(date, condition);
        $('#feedback').empty().append("<div class='animate__animated animate__flipInX' style='color: #15815f'><span style='color: #15815f' class='glyphicon glyphicon-ok icon' aria-hidden='true'></span></div><span class='text animate__animated animate__flipInX' style='color: #15815f'>Lendo "+chapters_day+" capítulos por dia, terminará no dia "+date_end+"</span>");
    }else{
        var days_end = condition - days;
        var year = date.getFullYear()+1;
        $('#feedback').empty().append("<div class='animate__animated animate__shakeX' style='border-color: #cc0000'><span style='color: #cc0000' class='glyphicon glyphicon-remove icon' aria-hidden='true'></span></div><span class='text animate__animated animate__shakeX' style='color: #cc0000'>Não terminará neste ano. Precisará de "+days_end+" dias em "+year+".</span>");
    }
}

function calculate_date_end(date, condition){
    var month_days = [31, leap_year(date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_toString = ["Janeiro", "Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    var month = parseInt(date.getMonth());
    var day = parseInt(date.getDate());

    while(condition>0){
        for (var i = day; i <= month_days[month]; i++){
            condition--;
            if(condition==0){
                day = i+1;
                break;
            }        
        }
        if(condition == 0) continue;
        day = 1;
        month++;
    }
    return day+" de "+month_toString[month]+".";
}

function sum_chapters(book, chapter_start){
    book = parseInt(book);
    var sum=0;

    for (var i = (book + 1); i < all_chapters.length; i++) sum += all_chapters[i];
    
    sum += all_chapters[book] - chapter_start;

    return sum;
}

function days_end_year(){
    var all_days=0;
    var date = new Date();
    var month_days = [31, leap_year(date), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = date.getMonth();
    var day = date.getDate();

    for (var i = month+1; i < month_days.length; i++) all_days += month_days[i];
    
    all_days += month_days[month] - day;
 
    return all_days;
}

function leap_year(date){
    return (date.getFullYear() % 4 == 0) ? 29 : 28;
}

function click_next(){
    var val = document.getElementById('current').value;
    if(val > 0 && val <= 1189){
        var chapter = parseInt(document.getElementById('current').value);
        $('#work_area').empty().append(html_page2);
        document.getElementById('save_chapter').value = chapter
    }else
        alert("Este número de capítulos não é permitido.");
}

function click_previous(){
    $('#work_area').empty().append(html_page1);
}

function up(){
    var current_value = parseInt(document.getElementById('current').value);
    var next_value = parseInt(document.getElementById('next').value);
    var down_value = parseInt(document.getElementById('previous').value);

    document.getElementById('next').value = next_value + 1;
    document.getElementById('current').value = current_value + 1;
    document.getElementById('previous').value = down_value + 1;
}

function down(){
    var current_value = parseInt(document.getElementById('current').value);
    if(current_value>1){
        var next_value = parseInt(document.getElementById('next').value);
        var down_value = parseInt(document.getElementById('previous').value);

        document.getElementById('next').value = next_value - 1;
        document.getElementById('current').value = current_value - 1;
        document.getElementById('previous').value = down_value - 1;
    }
}