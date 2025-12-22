class CompanyTools {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  sendEmail(to: string, subject: string) {
    console.log(`Dang gui email toi ${to} voi chu de ${subject} `);
  }
}
//thằng nhân viên "trườu tượng" chung cho tất cả nhân viên trong công ty
// nó có thể là qunar lý, dev, ba
abstract class BaseEmployee {
  protected name: string;

  protected readonly tools: CompanyTools;

  constructor(name: string) {
    this.name = name;
    this.tools = new CompanyTools();
  }
  //phương thức trừu tượng: băts buộc mọi lớp con phỉa định nghĩa
  abstract doWork(): void;
}

class Developer extends BaseEmployee {
  doWork(): void {
    this.tools.log(`Developer ${this.name} dang viet code...`);
  }
}

class Manager extends BaseEmployee {
  doWork(): void {
    this.tools.log(`Manager ${this.name} dang len lich hop`);
    this.tools.sendEmail(`pw@cty.com`, 'hop khan');
  }
}

const dev = new Developer('Tuan');

const manager = new Manager('An');
dev.doWork();
manager.doWork();
