'use strict';

module.exports = function(Admin) {

    // remote method (Name)
    Admin.remoteMethod(
        'getName',
        {
            description: 'get name',
            accepts: [
                { arg: 'name', type: 'string'}
            ],
            returns:{
                arg: 'res', type:'object', root: true
            },
            http: { path: '/getName', verb: 'get' }
        }
    );

    Admin.getName = function(name, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    name : {
                        like : name
                    }
                }
            }
            Admin.find(filter, function(err, result){
                if(err) reject (err)
                if(result === null){
                    err = new Error ("Nama Tidak Dapat Ditemukan")
                    err.statusCode = 404
                    reject (err)
                }
                resolve(result)
            })
        }).then(function(res){
            if (!res) callback (err)
            return callback (null, res)
        }).catch(function(err){
            callback(err);
        });
    }

//-----------------------------------------------------//
//-----------------------------------------------------//
//-----------------------------------------------------//

// remote method (find By ID)
Admin.remoteMethod(
    'getID',
    {
        description: 'get ID',
        accepts: [
            { arg: 'id', type: 'string'}
        ],
        returns:{
            arg: 'res', type:'object', root: true
        },
        http: { path: '/getID', verb: 'get' }
    }
);

Admin.getID = function(id, callback){
    new Promise(function(resolve, reject){
        Admin.findById(id, function(err, result){
            if(err) reject (err)
            if(result === null){
                err = new Error ("Id Tidak Dapat Ditemukan")
                err.statusCode = 404
                reject (err)
            }
            resolve(result)
        })
    }).then(function(res){
        if (!res) callback (err)
        return callback (null, res)
    }).catch(function(err){
        callback(err);
    });
}



};
