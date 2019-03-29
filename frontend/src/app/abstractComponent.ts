export class AbstractComponent {

  message: {};
  classCss: {};

  public showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert':true
    }
    this.classCss['alert-'+type] = true;
  }
}