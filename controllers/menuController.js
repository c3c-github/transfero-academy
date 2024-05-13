const jsforce = require('jsforce');

const formApp = (req, res) => {
    res.render("form", {form : {'name': 'APP'}} );
}




const thanks = (req, res) => {
        // replace with your Salesforce Connected App credentials
        const clientId = '3MVG9kBt168mda_.w.QvoiO2iDaMpEetoED2YQ29eJfNXjSEcwk2jxiakgaJ0I576b_55vQxuhzTI6gFK.LBS';
        const clientSecret = 'B57FA523BEE888680A9D2D76A51BA8DAC42727367B40AB26952C63CA34BF0C11';
        const username = 'deodato.cunha@c3csoftware.com.br';
        const password = 'c3c2024*';
        const securityToken = 'yG4BFdTwz11t80brbdAHLee0';
    
        const conn = new jsforce.Connection({
            oauth2: {
                clientId: clientId,
                clientSecret: clientSecret,
                redirectUri: 'http://localhost:3000/oauth2/callback' // replace with your callback URL
            }
        });

        conn.login(username, password + securityToken, function(err, userInfo) {
            if (err) { return console.error(err); }
            console.log('Logged in to Salesforce');
            console.log('Access Token: ' + conn.accessToken);
            console.log('Instance URL: ' + conn.instanceUrl);
            console.log('body: ',req.body);

            var product = '';

            if(req.body.product != undefined){
                if(typeof req.body.product == 'string'){
                    product = req.body.product;
                }
                else{
                    for(var i =0 ; i < req.body.product.length; i++){
                        product = product + req.body.product[i]+';';
                    }
                }
                console.log('product: ',product);
            }
            

            const lead = {
                RecordTypeId : '012N5000001ntcH',
                LastName : req.body.name,
                Email : req.body.email,
                MobilePhone : req.body.phone,
                Description : product,
                Company : req.body.company,
                Title : req.body.title
            };  
    
            conn.sobject('Lead').create(lead, function(err, result) {
            if (err) {return console.error(err); }
                console.log('Lead inserted with Id: ' + result.id);                
            });
            
            res.render("thanks", {form : {'name': req.body.formType}} );

        });

        conn.version = '54.0';

        res.render("thanks", {form : {'name': ''}} );
        
}

module.exports =  {
    formApp,
    thanks
};