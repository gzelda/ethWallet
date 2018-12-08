contractAddress = {
	    bgsMainnetAddress: '0x2c02ce7A9C7024E67b70e9d5B353685191f4B56e', // main network
	    bgsKovanAddress:'0x4743dd93d571c666a9153c54b136e10541e8d622'
};

chain = {
	kovan : "https://kovan.infura.io",
	mainnet :"https://mainnet.infura.io",
}

token = {
	ethDecimals : 18,
	bgsDecimals : 4
}

module.exports = {
	contractAddress,
	chain,
	token
}