import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";
import { BaseHttpService } from './base-http.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BomService extends BaseHttpService {

  showBom<T>(input: any){
    const url = this.APP_BASE_HREF+'showBom';
    return this.get(url);
   }
}
