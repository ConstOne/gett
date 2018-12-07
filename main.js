if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('input_csv').addEventListener('change', function(e) {


        var file = e.target.files[0];

        var output = document.getElementById('output');

        var output_tbody = document.getElementById('output-t');

        var input_cal = document.getElementById('input_cal').value;
        input_cal = input_cal - 1;
        var input_number = document.getElementById('input_number').value;

        var reader = new FileReader();


        reader.onload = function(e) {


            // var reg = /[ID]+[\S\s\W\w\D\d]+[;](?=[\n\r]+[\n\r]+[Тип])/g;
            var reg = /[ID]+[\S\s\W\w\D\d]+[;]*(?=[\n\n\n\n]+[Тип])/g;

            var text = e.target.result;

            var newtext = reg.exec(text);

            console.log(newtext);


            // var textsplit = newtext.toString().replace(/[\n\r]/g, ';').replace(/[,]+(?=[\d]+[\d])/g, '').split(';');

            // var str = newtext.toString();
            // // var regn = /[\n\r]/g;
            // var anstr = str.replace(/[\n\r]/g, ';');

            // var nstr = anstr.replace(/[,]+(?=[\d]+[\d])/g, '');

            // var textsplit = nstr.split(';');


            var textsplit = newtext.toString().replace(/[\n\r]+[Москва]+[\n\r]/g, ' Москва ').replace(/[\n\r]/g, ';').replace(/[,]+(?=[\d]+[\d])/g, '').split(';');

            // var textsplit = newtext.toString().replace(/[\n\r]/g, ';').replace(/[,]+(?=[\d]+[\d])/g, '').split(';');

            


            var arraytext = []; 

            console.log(textsplit.lenght);


            var n = 22,m = Math.floor(textsplit.length / n);
            console.log(m)
             // m = textsplit.length / n;console.log(m);

            var g = 0;
            for (var i = 0; i < m; i++) {
                arraytext[i] = [];

                for (var j = 0; j < n; ++j) {
                    arraytext[i][j] = textsplit[g];
                    g++;
                    if(g % n == 0 && textsplit[g] == '' ){
                        textsplit.splice(g, 1); /////!!!!!!!! LAVANDOS
                    // console.log(j)
                    }
                }


            }
            var y = i - 1;
            console.log("Число заказов : " + y);
            console.log(arraytext);


            var db = arraytext; // Сортировка по ID
            db.sort(function(a, b) {
                return a[0] - b[0];
            })

            function doSmth(a) {
                for (var q = 1, i = 1; q < a.length; ++q) {
                    if (a[q] !== a[q - 1]) {
                        a[i++] = a[q];
                    }
                }

                a.length = i;
                return a;
            }

            var arry = [];
            for (var i = 0; i < db.length; i++) {

                arry[i] = db[i][0];

            }

            var gg = doSmth(arry);
            gg.shift();

            var final_arry = [];
            for (var i = 0; i < gg.length; ++i) {
                final_arry[i] = [];
            }


            var k = 0;
            var cd = 0;
            var d = 0;
            var cache_cd = 0;
            var cache_cd4 = 0;
            var cache_cd20 = 0;
            var cache_cd40 = 0;
            var c, c4, c20, c40;
            // console.log(gg);console.log('DB',db);
            for (j = 0; j < gg.length; j++) {


                var cache_id = gg[j];
                

                for (var i = 1; i < db.length; ++i) {
                    if (db[i][20] == null) { db[i][20] = 0;
                     }
                    if (db[i][10] == null) { db[i][10] = 0;
                     }

                }


                for (i = 1; i < db.length; ++i) {
                    if (cache_id == db[i][0]) {

                        final_arry[k][0] = db[i][0];
                        final_arry[k][1] = ++d;
                        final_arry[k][2] = db[i][1];

                        c = +db[i][input_cal];
                        cache_cd = cache_cd + c;
                        final_arry[k][3] = cache_cd / 100;

                        c4 = +db[i][7];
                        cache_cd4 = cache_cd4 + c4;
                        final_arry[k][4] = cache_cd4 / 100;

                        c20 = +db[i][20];
                        cache_cd20 = cache_cd20 + c20;
                        final_arry[k][5] = cache_cd20 / 100;

                        c40 = +db[i][10];
                        cache_cd40 = cache_cd40 + c40;
                        final_arry[k][6] =  cache_cd40 / 100;
                    }

                }

                cache_cd = 0, cache_cd4 = 0;
                cache_cd20 = 0, cache_cd40 = 0;
                cd = 0;
                cd4 = 0;
                cd20 = 0;
                c40 = 0;
                d = 0;
                k++;

            }

            output.innerHTML += '<thead>' + '<tr>' +

            '<th>ID</th>' +
            '<th>' + db[0][1] + '</th>' +


            '<th>' + '("' + db[0][8] + '" - "'+ db[0][10] + '" - "' + db[0][20] +  '" ) * "Коэффицент(' + input_number + ')"-"' + db[0][7]+'"+"'+ db[0][10] + '" + "'+ db[0][20]+'"'+


            '<th>' + 'Совершенно поездок' + '</th>' +
            '<th>' + db[0][input_cal] + '</th>' +
            '<th>' + 'Получено от клиента' + '</th>' +
            '<th>' + '"' + db[0][input_cal] + '" умноженный на коэффицент(' + input_number + ') и минус "Получено от клиента"' +
            '<th>' + db[0][20] + '</th>' +
            '<th>' + db[0][10] + '</th>' +
            '</tr></thead><tbody id="tbody"></tbody>';
            for (i = 0; i < final_arry.length; i++) {
                // console.log(final_arry[i]);

                var cache_number = final_arry[i][3];

                var cache_number1 = final_arry[i][3] * input_number - final_arry[i][4];


                var third_col =  (final_arry[i][3] - final_arry[i][6] - final_arry[i][5]) * input_number - final_arry[i][4] + final_arry[i][6] + final_arry[i][5];

                document.getElementById("tbody").innerHTML += '<tr>' +


                '<td>' + final_arry[i][0] + '</td>' +
                '<td>' + final_arry[i][2] + '</th>' +

                '<td>' + third_col.toFixed(2) + '</th>' +

                '<td>' + final_arry[i][1] + '</td>' +
                '<td>' + cache_number.toFixed(2) + '</td>' +
                '<td>' + final_arry[i][4].toFixed(2) + '</td>' +
                '<td>' + cache_number1.toFixed(2) + '</td>' +
                '<td>' + final_arry[i][5].toFixed(2) + '</td>' +
                '<td>' + final_arry[i][6].toFixed(2) + '</td>' +
                '</tr>';

            }

        }
        reader.readAsText(file);
        $("#form").hide();
        $("#br").hide();
    });
} else {
    alert('File API is not supported!');
};