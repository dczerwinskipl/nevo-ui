import { http, HttpResponse, PathParams } from 'msw';
import { withScenarios, getCurrentScenario } from '@nevo/api-mocks';
import { createProductDatabase } from './database';

const db = createProductDatabase();

export const productHandlers = [
  http.get('/api/products', withScenarios(async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status');
    const tag = url.searchParams.get('tag');
    const maxPrice = url.searchParams.get('maxPrice') ? Number(url.searchParams.get('maxPrice')) : null;
    
    const scenario = getCurrentScenario();
    
    if (scenario === 'empty') {
      return HttpResponse.json({
        data: [],
        totalCount: 0,
        page,
        limit,
        totalPages: 0
      });
    }
    
    const result = db.getProducts({ 
      page, 
      limit, 
      search, 
      status,
      tag,
      maxPrice
    });
    
    return HttpResponse.json(result);
  })),
  
  http.get('/api/products/:id', withScenarios(async ({ params }: { params: PathParams }) => {
    const product = db.getProduct(params.id as string);
    
    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(product);
  })),
  
  http.post('/api/products', withScenarios(async ({ request }: { request: Request }) => {
    const data = await request.json();
    const product = db.createProduct(data);
    
    return HttpResponse.json(product, { status: 201 });
  })),
  
  http.put('/api/products/:id', withScenarios(async ({ params, request }: { params: PathParams; request: Request }) => {
    const data = await request.json();
    const product = db.updateProduct(params.id as string, data);
    
    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json(product);
  })),
  
  http.delete('/api/products/:id', withScenarios(async ({ params }: { params: PathParams }) => {
    const success = db.deleteProduct(params.id as string);
    
    if (!success) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({ success: true });
  }))
];