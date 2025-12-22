function makeCake(flavor: 'chocolate' | 'vanilla', layers: number, isVegan: boolean) {
  console.log(`Making a ${layers} - layers ${flavor} cake. Vega: ${isVegan}`);
}

type MakeCakeType = typeof makeCake;

type CakeInputs = Parameters<MakeCakeType>;

type flavor = CakeInputs[0];

type layers = CakeInputs[1];

type PageName = 'Home' | 'Login' | 'Dashboard';

// -> muon tao ra 1 cai object co key la page name va value 1 string
//trong cai object day co bn gia tri ko can biet
// chi can biet la toi co key la pageName, va value la string
//Record

const appPages: Record<PageName, string> = {
  Home: '/home',
  Login: '/login',
  Dashboard: 'dashboard',
};

///
interface Customer {
  username: string;
  password: string;
  plan: 'free' | 'vip';
  isActive: boolean;
}

function createStore<T extends Record<string, Customer>>(fixture: T) {
  return (key: keyof T) => {
    return fixture[key];
  };
}

const getTestUser = createStore({
  standardUser: {
    username: 'user_123',
    password: '123',
    plan: 'free',
    isActive: true,
  },
  vipUser: {
    username: 'user_123',
    password: '123',
    plan: 'vip',
    isActive: true,
  },
});

const data = getTestUser('standardUser');

interface CoTheCanCuoc {
  id: string;
}

function checkIn<T extends CoTheCanCuoc>(khachHang: T) {
  console.log(`Khach hang co Id ${khachHang.id} duoc phep vao`);
  return khachHang;
}

const nguoiA = { id: '123' };
checkIn(nguoiA);

const richKid = {
  id: '9999',
  name: 'Batman',
  money: 100000,
};

richKid.id;

checkIn(richKid);

const nguoiQuenVi = {
  name: 'Joker',
};

function createLogger<T extends Record<string, string>>(evenMap: T) {
  return (eventName: keyof T) => {
    const code = evenMap[eventName];
    console.log(`Gui su kien ${String(eventName)} - ma: ${code}`);
  };
}

const eventMap = {
  BTN_CLICK_SIGUP: 'EVT_01',
  BTN_VIEW_HOME: 'EVT_02',
};

const logEvent = createLogger(eventMap);

logEvent('BTN_CLICK_SIGUP');

// kế thừa - kết hợp/thành phần (inheritance, composition)

// kế thừa là mối quan hệ  là một
// ví dụ con mèo là 1 động vật, giám đốc là 1 nhân viên
// con cái thừa hưởng gen của bm

// kết hợp ;

// có xe hơi có 1 cái động cơ (chứ ko phải xe hơi là động cơ)
// tư duy: lắp ráp lego. tạo 1 cái vật thể lớn từ các mạn ghép nhỏ

//class cha
class SmartDevcie {
  connectWifi() {
    console.log('connected wifi');
  }
  playMusicAndLight() {
    console.log('vua hat vua chieu sang');
  }
}

class SmartLight extends SmartDevcie {
  turnOn() {
    console.log('Light on');
  }
}

class SmartSpeaker extends SmartDevcie {
  playMusic() {
    console.log('Music on');
  }
}

// neu bh lla sep yeu cau lam thiet bi den biet hat
// class SigingLight extends SmartDevcie {}

class WifiModule {
  connect() {
    console.log('wifi da connect');
  }
}

class LightMoudle {
  on() {
    console.log('bat');
  }
  off() {
    console.log('tat');
  }
}

class SpeakerModule {
  play(song: string) {
    console.log(`dang hat ${song}`);
  }
}

class SigingLight {
  private wifi = new WifiModule();
  private light = new LightMoudle();
  private speaker = new SpeakerModule();

  partyTime() {
    this.wifi.connect();
    this.light.on();
    this.speaker.play('OLLAA');
  }
}
const myPartyLight = new SigingLight();
myPartyLight.partyTime();
