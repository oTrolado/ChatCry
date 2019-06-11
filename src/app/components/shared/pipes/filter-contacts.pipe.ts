import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(value: Array<object>, args?: string): Array<object> {
    if(!args)
      return value;
    else
      return value.filter(contact => contact['nome'].toLowerCase().indexOf(args.toLowerCase()) != -1);
  }

}
