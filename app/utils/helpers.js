module.exports = {
    pretty_date: function(date) {
        var d = new Date(date),
            M = d.getMonth() + 1,
            D = d.getDate(),
            h = d.getHours(),
            m = d.getMinutes();
        if (M < 10) {
            M = "0" + M;
        }
        if (D < 10) {
            D = "0" + D;
        }
        if (h < 10) {
            h = "0" + h;
        }
        if (m < 10) {
            m = "0" + m;
        }


        return d.getFullYear() + '-' + M + '-' + D + ' ' + h + ':' + m;
    }
};
