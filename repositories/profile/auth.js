const { User, validateUser } = require('../../models/user');
const asyncMiddleware = require('../../middlewares/asyncMiddleware');
const Response = require('../../middlewares/response');

exports.userSignup = asyncMiddleware( async (req, res, next)=> {
    return res.send({});
    var data = req.body;
    console.log(data);
    const { error } = validateUser(data);

    if(error) {
        console.log('ok');
        let response = Response('error', error.details[0].message);
        return res.status(response.statusCode).send(response);
    };

    var user = await User.findOne({email: data.email});

    if(user) {
        let response = Response('error', 'email already registered');
        return res.status(response.statusCode).send(response);
    }

    var newUser = new User(data);
    var token = await newUser.generateAuthToken();

    // Save newUser object to database 
    await newUser.save((err, User) => { 
        if (err) { 
            let response = Response('error', 'user is not created');
            return res.status(response.statusCode).send(response); 
        } 
        else { 
            let response = Response('success', 'user added', { token });
            return res.send(response);
        } 
    });
});