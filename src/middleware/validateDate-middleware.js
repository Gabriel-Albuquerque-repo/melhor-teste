function tranfsDate (d, m, y) {
    return new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
}

function verify (date) {
    const regexDD = new RegExp(/^[0](?=[1-9])|[12](?=[0-9])|3(?=0|1)[//]/)
    const regexMM = new RegExp(/0(?=[1-9])|1(?=0|1|2)/)
    const regexYYYY= new RegExp(/[//]201(?=8|9)|2\d[2-9]\d$/)

    const yyyy = regexYYYY.test(date) ? date.slice(-4) : false;
    const mm = regexMM.test(date) ? date.slice(3,5) : false;
    const dd = regexDD.test(date) ? date.slice(0,2) : false;

    if(yyyy && mm && dd){
        if(yyyy == '2018' && mm <= '12' && dd <= '25'){
            console.log(5)
            return false;
        } else{
            return tranfsDate(dd, mm, yyyy);
        }
    } else {
        return tranfsDate(dd, mm, yyyy);
    }
}

exports.validation = async(req, res, next) => {
    try{
        const verifyStartDate = verify(req.body.startDate);
        const verifyEndDate = verify(req.body.endDate);
        if((verifyStartDate | verifyEndDate) == false){
            return res.status(400).send({ ErrorMessage: `Invalid Date` });
        } 
        if( verifyEndDate >= verifyStartDate){
            return res.status(400).send({ ErrorMessage: `Invalid Date` });
        }
        req.body.startDate = verifyStartDate;
        req.body.endDate = verifyEndDate;
        return next();
    } catch(e) {
        res.status(500).send({ ErrorMessage: `Server side error`,error: e });
    }
}