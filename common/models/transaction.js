'use strict';

module.exports = function(Transaction) {

        // remote method (Product Name)
        Transaction.remoteMethod(
            'getProductName',
            {
                description: 'get product name',
                accepts: [
                    { arg: 'product_name', type: 'string'}
                ],
                returns:{
                    arg: 'res', type:'object', root: true
                },
                http: { path: '/getProductName', verb: 'get' }
            }
        );
    
        Transaction.getProductName = function(product_name, callback){
            new Promise(function(resolve, reject){
                var filter = {
                    where: {
                        product_name : {
                            like : product_name
                        }
                    }
                }
                Transaction.find(filter, function(err, result){
                    if(err) reject (err)
                    if(result === null){
                        err = new Error ("Nama Product Tidak Dapat Ditemukan")
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

// remote method (Category)
    Transaction.remoteMethod(
        'getCategory',
        {
            description: 'get category',
            accepts: [
                { arg: 'category', type: 'string'}
            ],
            returns:{
                arg: 'res', type:'object', root: true
            },
            http: { path: '/getCategory', verb: 'get' }
        }
    );

    Transaction.getCategory = function(category, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    category : {
                        like : category
                    }
                }
            }
            Transaction.find(filter, function(err, result){
                if(err) reject (err)
                if(result === null){
                    err = new Error ("Category Tidak Dapat Ditemukan")
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
Transaction.remoteMethod(
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

Transaction.getID = function(id, callback){
    new Promise(function(resolve, reject){
        Transaction.findById(id, function(err, result){
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
