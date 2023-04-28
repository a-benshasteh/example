import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { BomService } from '../bom.service';
import {MatTable} from '@angular/material/table';
interface FoodNodeFlat {
  name: string;
  id: Number;
  parentId: number | null;
  children?: FoodNodeFlat[];
  NPN:string;
  TPN: string;
  quantity:number;
  level:number;
  TEN: string | null;   
  price: string | null;   
  standard: string | null;   
  type: string | null;   
  order_code: string | null;   
  packaging_dim: string | null;   
  mass: string | null;   
  volume: string | null;   
  density: string | null;   
  main_material: string | null;   
  rep_material1: string | null;   
  rep_material2: string | null;   
  hardness: string | null;   
  coating: string | null;   
 }
let TREE_DATA: FoodNodeFlat[] = [
  //   {name:'part000',NPN:'v6000',TPN:'19000' ,quantity:1 , level: 1,parentId: null, id: 1},
  //   {name:'part010',NPN:'v6100',TPN:'19100' ,quantity:2 , level: 2, parentId:1, id: 2},
  //   {name:'part020',NPN:'v6200',TPN:'19200' ,quantity:4 , level: 2, parentId:1, id: 3},
  //   {name:'part030',NPN:'v6300',TPN:'19300' ,quantity:3 , level: 2, parentId:1, id: 4},
  //   {name:'part011',NPN:'v6110',TPN:'19110' ,quantity:3 , level: 3, parentId:2, id: 5},
  //  { name:'part012',NPN:'v6120',TPN:'19120' ,quantity:2 , level: 3, parentId:2, id: 6},
  //   {name:'part021',NPN:'v6210',TPN:'19210' ,quantity:3 , level: 3, parentId:3, id: 7},
  //   {name:'part022',NPN:'v6220',TPN:'19220' ,quantity:2 , level: 3, parentId:3, id: 8},
  //   {name:'part031',NPN:'v6310',TPN:'19310' ,quantity:2 , level: 3, parentId:4, id: 9},
  //   {name:'part031',NPN:'v6310',TPN:'19310' ,quantity:2 , level: 3, parentId:5, id: 10},
];

interface ExampleFlatNode {
 expandable: boolean;
 name: string;
 level: number;
 TPN: string; //also here
 parent:  number | null;
}
@Component({
 selector: 'app-tree-component',
 templateUrl: './tree-component.component.html',
 styleUrls: ['./tree-component.component.scss']
})
export class TreeComponentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'count'];
  
private _transformer = (node: FoodNodeFlat, level: number) => {
 return {
 expandable: !!node.children && node.children.length > 0,
 name: node.NPN,
 level: level,
 TPN: node.TPN, //here
 parent:node.parentId,
 };
 }
treeControl = new FlatTreeControl<ExampleFlatNode>(
 node => node.level, node => node.expandable);
treeFlattener = new MatTreeFlattener(
 this._transformer, node => node.level, node => node.expandable, node => node.children);
dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  data: any;
  TreeData: any;
constructor(private bomservice: BomService) {
 //this.dataSource.data = TREE_DATA;
 }
hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
ngOnInit() {
  // 1- this.dataSource.data =this.treeConstruct(TREE_DATA);
  this.showBom()
 }
 showBom(){
  let input= 0;
  this.bomservice.showBom(input).subscribe(Response =>{
    this.data = Response;

    //2
    TREE_DATA = this.data
    //3
    this.dataSource.data =this.treeConstruct(TREE_DATA);
    console.log(TREE_DATA);
  },
  Error=>{
    this.error = Error.error;
    console.log(this.error);

  })
 }
  error(error: any) {
    throw new Error('Method not implemented.');
  }
//constructTree recursively iterates through the tree to create nested tree structure.
  //We only need Id and parentId Columns in the flat data to construct this tree properly.
  treeConstruct(treeData: FoodNodeFlat[]): FoodNodeFlat[] {
    let constructedTree: FoodNodeFlat[] = [];
    for (let i of treeData) {
      let treeObj = i;
      let assigned = false;
      this.constructTree(constructedTree, treeObj, assigned)
    }
    return constructedTree;
  }
  constructTree(constructedTree:FoodNodeFlat[], treeObj: FoodNodeFlat, assigned:boolean) {
    if (treeObj.parentId == null) {
      treeObj.children = [];
      constructedTree.push(treeObj);
      return true;
    } else {
      for (let i = 0; i < constructedTree.length; i++) {
        let constructedObj = constructedTree[i];
        if (constructedObj.id === treeObj.parentId) {
          if (!constructedObj.children) {
            constructedObj.children = [];
          }
          constructedObj.children.push(treeObj);
          return true;
        } else if (constructedObj.children) {
          if (this.constructTree(constructedObj.children, treeObj, assigned)) {
            return true;
          }
        }
      }
    }
    return false;
    
  }
  



}