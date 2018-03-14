/*日期转换*/
//判断是否是闰年
function isLeapYear(year)
{  
	return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);  
}

exports.getNowDate=function getNowFormatDate(year,addmonth,week) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var stryear = date.getFullYear() - year;
    var month = date.getMonth()+1 - addmonth;
    var strDate = date.getDate() - week*7;
    //前一个月有31天
    if(month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11)
    {
    	if(strDate < 0)
    	{
    		strDate = 31 + strDate;
    		month -= 1;
    	}
    }
    //前一个月有30天
    if(month == 5 || month == 7 || month == 10 || month == 12)
    {
    	if(strDate < 0)
    	{
    		strDate = 30 + strDate;
    		month -= 1;
    	}
    }
    //闰年2月29天
    if(month == 3 && isLeapYear(stryear))
    {
    	if(strDate < 0)
    	{
    		strDate = 29 + strDate;
    		month -= 1;
    	}
    }
    //非闰年2月28天
    if(month == 2 && !isLeapYear(stryear))
    {
    	if(strDate < 0)
    	{
    		strDate = 28 + strDate;
    		month -= 1;
    	}
    }
    if(month <= 0)
    {
    	month = 12 + month;
    	stryear -= 1;
    }
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = stryear + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}