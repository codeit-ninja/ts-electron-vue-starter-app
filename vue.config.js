module.exports = {
    pluginOptions: {
        electronBuilder: {
            enableRemoteModule: true,
            nodeIntegration: true,
            mainProcessWatch: [
                'src/services/*',
                'src/store/*',
            ],
        }
    }
}