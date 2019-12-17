import Validator from '../../../src/index';

describe('hashtagRules', () => {



  it('should success hashtag rules', async () => {
    let data = {
      val1: '#Hashtag',
      val2: 'Hashtag',
      val3: '#22Hashtag',
      val4: '~~~Hashtag~~~',
      val5: '#####',
      val6: '#Hash#Tag#',
      val7: '#HashTag#',
      val8: [],
      val9: {},
      val10: 22,
      val11: 2.2,
      val12: false,
      val13: '22',
      val14: undefined,
      val15: [1, 2, 3]
    };
    let rules = {
      val1: 'hashtag', // true
      val2: 'hashtag', // false
      val3: 'hashtag', // true
      val4: 'hashtag', // false
      val5: 'hashtag', // false
      val6: 'hashtag', // false
      val7: 'hashtag', // false
      val8: 'hashtag', // false
      val9: 'hashtag', // false
      val10: 'hashtag', // true
      val11: 'hashtag', // false
      val12: 'hashtag', // false
      val13: 'hashtag', // false
      val14: 'hashtag', // false
      val15: 'hashtag', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(13);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must match hashtag format. eg. #hello'],
      val4: ['val4 must match hashtag format. eg. #hello'],
      val5: ['val5 must match hashtag format. eg. #hello'],
      val6: ['val6 must match hashtag format. eg. #hello'],
      val7: ['val7 must match hashtag format. eg. #hello'],
      val8: ['val8 must match hashtag format. eg. #hello'],
      val9: ['val9 must match hashtag format. eg. #hello'],
      val10: ['val10 must match hashtag format. eg. #hello'],
      val11: ['val11 must match hashtag format. eg. #hello'],
      val12: ['val12 must match hashtag format. eg. #hello'],
      val13: ['val13 must match hashtag format. eg. #hello'],
      val14: ['val14 must match hashtag format. eg. #hello'],
      val15: ['val15 must match hashtag format. eg. #hello']
    }));
  });

  it('nested hashtag', async () => {
    let data = {
      temp: {
        val1: '#Hashtag',
        val2: '######',
      }
    };
    let rules = {
      temp: {
        val1: 'hashtag', // unexpected rule
        val2: 'hashtag' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp.val2': ['temp.val2 must match hashtag format. eg. #hello']
    }))
  });
});