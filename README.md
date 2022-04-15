# code.mju-rats.com 
해당 프로젝트는 [PutongOJ](https://github.com/acm309/PutongOJ.git) 를 수정하였습니다.

## Features
- Built on Docker -- One click Deployment
- Single Page Application -- Better User Experience
- Support multiple cases of test data
- Powered by Vue.js, Koa.js, MongoDB, Redis


## 주요 변경 사항 
 - FE/BE 의존성 제거 
 - FE/BE dockerize (docker-compose)

## Docker

### Production 

1. clone project

```bash
git clone --recursive https://github.com/RATS-make-robot/code.mju-rats.com.git
```

2. run

```bash
docker-compose up --build -d
```

### Dev

1. clone project

```bash
git clone --recursive https://github.com/RATS-make-robot/code.mju-rats.com.git
```
2. run

```bash
docker-compose -f docker-compose-dev.yml up --build -d
```

It will listen on 3000 ports after it is successfully deployed. Then you can directly visit this platform.

Enjoy it!


### TODO 
 - [X] docker-compose (DEV/Production)
 - [ ] Auto reload for dev


> (For version 1, please visit [here](https://github.com/acm309/PutongOJ/tree/v1))

[![Build Status](https://img.shields.io/travis/acm309/PutongOJ.svg?branch=master&style=flat-square)](https://travis-ci.org/acm309/PutongOJ)
[![Codecov](https://img.shields.io/codecov/c/github/acm309/PutongOJ.svg?style=flat-square)](https://codecov.io/gh/acm309/PutongOJ)
[![David](https://img.shields.io/david/acm309/PutongOJ.svg?style=flat-square)](https://david-dm.org/acm309/PutongOJ)
[![Node](https://img.shields.io/badge/node-%3E=9.0.0-ff69b4.svg?style=flat-square)](https://nodejs.org/en/download/releases/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)

## Browser Support

- IE: **NOT** recommended
- Chrome: 50 or above is recommended
- Firefox: 50 or above is recommended
- Edge: recommended

## LICENSE

[MIT](https://github.com/acm309/PutongOJ/blob/master/LICENSE)
