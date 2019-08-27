'use strict';

module.exports = function(Commodity) {

    // remote method (Product Name)
    Commodity.remoteMethod(
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

    Commodity.getProductName = function(product_name, callback){
        new Promise(function(resolve, reject){
            var filter = {
                where: {
                    product_name : {
                        like : product_name
                    }
                }
            }
            Commodity.find(filter, function(err, result){
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
Commodity.remoteMethod(
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

Commodity.getCategory = function(category, callback){
    new Promise(function(resolve, reject){
        var filter = {
            where: {
                category : {
                    like : category
                }
            }
        }
        Commodity.find(filter, function(err, result){
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
Commodity.remoteMethod(
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

Commodity.getID = function(id, callback){
    new Promise(function(resolve, reject){
        Commodity.findById(id, function(err, result){
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
