import Validator from '../../../src/index';

describe('urlRules', () => {



  it('should success url rules', async () => {
    let data = {
      val1: 'https://',
      val2: 'http://',
      val3: 'example.com',
      val4: 'EXAMPLE.COM',
      val5: 'www.example.com',
      val6: 'WWW.EXAMPLE.COM',
      val7: 'http://www.example.com',
      val8: 'https://www.example.com',
      val9: 'http://www.example.com/',
      val10: 'https://www.EXAMPLE.cOm',
      val11: 'HTTPS://www.EXAMPLE.cOm/',
      val12: 'https://www.example.com/',
      val13: 'http://example.com',
      val14: 'https://example.com',
      val15: 'ftp://example.com',
      val16: 'ftp://www.example.com/',
      val17: 'http://www.example.com/foo/bar',
      val18: 'http://www.example.com/foo/bar/',
      val19: 'http://www.example.com/foO/BaR',
      val20: 'https://www.example.com/foo/bar',
      val21: 'http://example.com/foo/bar',
      val22: 'https://example.com/foo/bar',
      val23: 'example.com/foo/bar',
      val24: 'www.example.com/foo/bar',
      val25: 'http://example.com/foo/bar |',
      val26: '1=http://www.example.com?foo=BaR',
      val27: 'http://www.example.com#fooBaR',
      val28: 'http://www.example.com',
      val29: 'http://www.example.com:8080',
      val30: 'http://www.example.com:8080/foo/bar',
      val31: 'www.example.com:8080',
      val32: 'www.example.com:8080/foo/bar',
      val33: 'http://www.example.com/foo bar',
      val34: 'www.example.com/foo bar',
      val35: 'http://example.com/foo/bar | link',
      val36: 'https://example.com/foo/bar | link',
      val37: 'example.com/foo/bar | link',
      val38: 'www.example.com/foo/bar | link',
      val39: 'www.example.com/foo/bar | 捦挺挎',
      val40: 'www.example.com/foo/捦挺挎/bar | link',
      val41: 'عمان.icom.museum',
      val42: 'http://عمان.icom.museum',
      val43: '1964thetribute.com',
      val44: '1964thetribute.com | 1964thetribute.com',
      val45: 'http://www.example.com/foo/bar?a=b&c=d',
      val46: 'http:www.example.com',
      val47: 'http:/www.example.com',
      val48: 'http://www.example.com/#',
      val49: 'http://www.example.com/?',
      val50: 'http://www.example1.com<br>http://www.example2.com',
      val51: 'http://www.example1.com and http://www.example2.com/',
      val52: '1=http://www.example.com/foo/bar?a=b&c=d',
      val53: '2=example.com',
      val54: '2=http://example.com/foo',
      val55: 'http://www.example.com | example',
      val56: '1=http://www.sho.com/site/dexter/home.sho| 2=Dexter{{}}s official website'
    };
    let rules = {
      val1: 'url', //false
      val2: 'url', //false
      val3: 'url', //false
      val4: 'url', //false
      val5: 'url', //false
      val6: 'url', //false
      val7: 'url', //true
      val8: 'url', //true
      val9: 'url', //true
      val10: 'url', //true
      val11: 'url', //false
      val12: 'url', //true
      val13: 'url', //true
      val14: 'url', //true
      val15: 'url', //false
      val16: 'url', //false
      val17: 'url', //true
      val18: 'url', //true
      val19: 'url', //true
      val20: 'url', //true
      val21: 'url', //true
      val22: 'url', //true
      val23: 'url', //false
      val24: 'url', //false
      val25: 'url', //false
      val26: 'url', //false
      val27: 'url', //true
      val28: 'url', //true
      val29: 'url', //true
      val30: 'url', //true
      val31: 'url', //false
      val32: 'url', //false
      val33: 'url', //false
      val34: 'url', //false
      val35: 'url', //false
      val36: 'url', //false
      val37: 'url', //false
      val38: 'url', //false
      val39: 'url', //false
      val40: 'url', //false
      val41: 'url', //false
      val42: 'url', //false
      val43: 'url', //false
      val44: 'url', //false
      val45: 'url', //false
      val46: 'url', //false
      val47: 'url', //false
      val48: 'url', //true
      val49: 'url', //true
      val50: 'url', //false
      val51: 'url', //false
      val52: 'url', //false
      val53: 'url', //false
      val54: 'url', //false
      val55: 'url', //false
      val56: 'url', //false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    console.log(err);
    expect(Object.keys(err).length).toBe(25);
    expect(err).toEqual(expect.objectContaining({
      val1: [ 'val1 must match url format.' ],
      val2: [ 'val2 must match url format.' ],
      val3: [ 'val3 must match url format.' ],
      val4: [ 'val4 must match url format.' ],
      val5: [ 'val5 must match url format.' ],
      val6: [ 'val6 must match url format.' ],
      val11: [ 'val11 must match url format.' ],
      val15: [ 'val15 must match url format.' ],
      val16: [ 'val16 must match url format.' ],
      val23: [ 'val23 must match url format.' ],
      val24: [ 'val24 must match url format.' ],
      val25: [ 'val25 must match url format.' ],
      val26: [ 'val26 must match url format.' ],
      val31: [ 'val31 must match url format.' ],
      val32: [ 'val32 must match url format.' ],
      val33: [ 'val33 must match url format.' ],
      val34: [ 'val34 must match url format.' ],
      val35: [ 'val35 must match url format.' ],
      val36: [ 'val36 must match url format.' ],
      val37: [ 'val37 must match url format.' ],
      val38: [ 'val38 must match url format.' ],
      val39: [ 'val39 must match url format.' ],
      val40: [ 'val40 must match url format.' ],
      val41: [ 'val41 must match url format.' ],
      val42: [ 'val42 must match url format.' ],
      val43: [ 'val43 must match url format.' ],
      val44: [ 'val44 must match url format.' ],
      val46: [ 'val46 must match url format.' ],
      val47: [ 'val47 must match url format.' ],
      val50: [ 'val50 must match url format.' ],
      val51: [ 'val51 must match url format.' ],
      val52: [ 'val52 must match url format.' ],
      val53: [ 'val53 must match url format.' ],
      val54: [ 'val54 must match url format.' ],
      val55: [ 'val55 must match url format.' ],
      val56: [ 'val56 must match url format.' ]
    }));
  });
});