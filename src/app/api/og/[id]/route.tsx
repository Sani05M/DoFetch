import { ImageResponse } from 'next/og';
import { createClient } from "@supabase/supabase-js";

export const runtime = 'edge';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch certificate data
    const { data: cert } = await supabase
      .from("certificates")
      .select("*, profiles!inner(full_name, department, batch, section)")
      .eq("id", id)
      .single();

    if (!cert) {
      return new Response('Not Found', { status: 404 });
    }

    const isApproved = cert.status === 'approved' || cert.status === 'verified';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #f1f1f1 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f1f1 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '80px',
          }}
        >
          {/* Main Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '900px',
              height: '500px',
              backgroundColor: '#fff',
              border: '12px solid #000',
              borderRadius: '60px',
              padding: '60px',
              boxShadow: '30px 30px 0px #000',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginBottom: '40px' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#000', 
                borderRadius: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#70e2a4'
              }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              
              <div style={{
                backgroundColor: isApproved ? '#ecfdf5' : '#000',
                color: isApproved ? '#059669' : '#fff',
                padding: '12px 30px',
                borderRadius: '20px',
                fontSize: '24px',
                fontWeight: '900',
                border: isApproved ? '4px solid #059669' : 'none',
              }}>
                {isApproved ? 'VERIFIED ARTIFACT' : 'PENDING SYNC'}
              </div>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#666', letterSpacing: '4px', marginBottom: '10px' }}>
                INSTITUTIONAL CREDENTIAL
              </div>
              <div style={{ fontSize: '72px', fontWeight: '900', color: '#000', lineHeight: 0.9, letterSpacing: '-4px', marginBottom: '30px' }}>
                {cert.title.toUpperCase()}
              </div>
              
              <div style={{ display: 'flex', marginTop: 'auto', borderTop: '4px solid #f1f1f1', paddingTop: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#999', letterSpacing: '2px', marginBottom: '5px' }}>HOLDER</div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#000' }}>
                    {((Array.isArray(cert.profiles) ? cert.profiles[0] : cert.profiles) as any)?.full_name?.toUpperCase() || 'VERIFIED SCHOLAR'}
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '16px', fontWeight: '900', color: '#999', letterSpacing: '2px', marginBottom: '5px' }}>REGISTRY ID</div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#000' }}>#{id.slice(0, 12)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
