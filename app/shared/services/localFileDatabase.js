const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

const directory = baseDir = path.join(__dirname,'../../../db/');

function LocalFileDatabase() {}

LocalFileDatabase.prototype.create =  (dir, file, data) => {

    const newFile = `${directory}${dir}/${file}.json`;
    return new Promise((resolve, reject) => {
        fsPromise.open(newFile, 'wx')
            .then(fileDescriptor => {
                if (fileDescriptor) {
                    const stringData = JSON.stringify(data);
                    return {
                        fileDescriptor: fileDescriptor,
                        stringData: stringData
                    };
                }
            }, function (err) {
                reject(err)
            })
            .then(data => {
                return new Promise(function (resolve, reject) {
                    fsPromise.writeFile(data.fileDescriptor, data.stringData)
                        .then(() => {
                            resolve(data.fileDescriptor);
                        });
                });
            })
            .then(fileDescriptor => {
                return new Promise(() => {
                    fs.close(fileDescriptor.fd , err => {
                        if(err)
                            reject(err);
                         else
                            resolve(data);
                    });
                });
            }, err => {
                console.log('Error', err);
                reject(new Error(err));
            });
    });

};

LocalFileDatabase.prototype.read =  (dir, file) => {
    const openFile = `${directory}${dir}/${file}.json`;
    return new Promise((resolve, reject) => {
        fsPromise.readFile(openFile, 'utf8')
            .then(data => {
                const parseData  = JSON.parse(data);
                resolve(parseData);
            }, error => {
                reject(new Error(error));
            });
    })
};

LocalFileDatabase.prototype.update =  (dir, file, data) =>  {
    const updateFile = `${directory}${dir}/${file}.json`;

    return new Promise((resolve, reject) => {
        fsPromise.open(updateFile, 'r+')
            .then(fileDescriptor => {
                return {
                    fileDescriptor: fileDescriptor,
                    stringData: JSON.stringify(data)
                };
            })
            .then(data => {
                console.log('Truncate', updateFile );
                return new Promise(((resolve, reject) => {
                    fsPromise.truncate(updateFile)
                        .then(() => {
                            resolve(data);
                        }, err => reject(err))
                }));
            })
            .then(data => {
                return new Promise((resolve, reject) => {
                    fsPromise.writeFile(data.fileDescriptor, data.stringData)
                        .then(() => {
                            resolve(data.fileDescriptor);
                        }, err => reject(err));
                });
            })
            .then(fileDescriptor => {
                return new Promise(() => {
                    fs.close(fileDescriptor.fd , err => {
                        if(err){
                            reject(new Error(err))
                        } else {
                            resolve(data);
                        }
                    });
                });
            }, err =>{
                console.log('Error', err);
                reject(new Error(err));
            });
    });
};

LocalFileDatabase.prototype.list = (dir) => {

    const folder = `${directory}${dir}/`;

    return new Promise((resolve, reject) => {
        fsPromise.readdir(folder)
            .then(data => {
                resolve(data);
            }, err => {
                reject(new Error(err));
            });
    });
};

LocalFileDatabase.prototype.delete = (dir, file) => {
    const deleteFile = `${directory}${dir}/${file}.json`;

    return new Promise((resolve, reject) => {
        fsPromise.unlink(deleteFile).then(() => resolve(true), err => reject(err));
    });
};

const localFileDatabase = new LocalFileDatabase();

module.exports = localFileDatabase;