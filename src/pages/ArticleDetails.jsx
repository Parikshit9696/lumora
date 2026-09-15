import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getArticleById, articles } from '../data/articles';
import { formatDate } from '../utils/formatters';

const bodyParagraphs = {
  'article-1': [
    'Great portraits rarely come from a perfect pose — they come from a subject who has stopped thinking about the camera. Give people something to do with their hands, a direction to look that isn\u2019t straight into the lens, or a small piece of movement between frames.',
    'Light is doing most of the work before your photographer even asks you to smile. Soft, indirect window light near midday shade, or the warm hour just after sunrise, tends to be the most forgiving and flattering for skin tones.',
    'Finally, plan for a handful of genuine expressions rather than one held smile. Sequences — a laugh building, a glance away and back — give your photographer more to choose from and usually produce the shot you end up loving most.',
  ],
  'article-2': [
    'The photos couples treasure years later are rarely the formal group shots — they\u2019re the in-between moments: hands being held under the table, a father seeing his daughter in her dress for the first time, the walk back to the car at the end of the night.',
    'Ask your photographer to build in unstructured time. A 20-minute window with no schedule, just you two, gives room for the kind of candid, quiet photography that a packed itinerary rarely allows.',
    'Consider a "first look" earlier in the day too. Beyond calming pre-ceremony nerves, it frees up your photographer to capture the reception with fresh light and a more relaxed couple.',
  ],
  'article-3': [
    'This season\u2019s editorial work leans into texture — raw concrete, brushed metal, and natural fabric against clean studio backdrops. Colour grading has moved toward warmer, slightly desaturated tones that feel closer to film than to punchy digital contrast.',
    'Movement is back in a big way. Editorial teams are shooting more sequences mid-motion — a coat swinging, hair caught mid-turn — rather than static poses, giving campaigns a kinetic, unscripted feel.',
    'Set design has simplified. Instead of elaborate backdrops, many shoots now rely on a single strong architectural line or a considered colour block, letting the wardrobe and the model carry the frame.',
  ],
  'article-4': [
    'Arrive with a rested face and a hydrated body — sleep and water genuinely do more for how you photograph than most last-minute beauty routines. Avoid anything new (skincare, haircuts, self-tan) in the 48 hours before your shoot.',
    'Bring two to three outfit options in different silhouettes and one accent colour you feel confident in. Simple, well-fitted clothing photographs better than busy patterns, which can distract from your expression.',
    'Arrive ten minutes early. Rushing in flustered shows on camera far more than people expect — a calm start to the session makes a visible difference in your first twenty frames.',
  ],
  'article-5': [
    'The best photography locations aren\u2019t always the most famous ones. Look for spots with layered depth — a foreground, midground, and background — which give portraits and couple shoots a more cinematic sense of place.',
    'Golden hour matters more outdoors than almost any other single variable. Scheduling a session an hour before sunset will usually outperform an expensive location shot at midday.',
    'Always have a backup indoor or covered option in mind, especially during monsoon months — a good photographer can make a covered courtyard or a characterful café feel just as intentional as a scenic outdoor spot.',
  ],
  'article-6': [
    'Natural, relaxed poses tend to start with posture, not expression. Weight shifted onto the back foot, shoulders slightly turned from the camera, and a soft bend in the elbows will photograph more naturally than a straight-on, squared stance.',
    'For couples, small points of contact — a hand on a shoulder, foreheads close, one person\u2019s laugh at something the other said — read as more genuine than mirrored, symmetrical poses.',
    'For families with young children, plan for movement rather than stillness. A "walk toward me" or a gentle tickle moment usually produces a far more natural set of expressions than asking everyone to hold still.',
  ],
  'article-7': [
    'A great headshot starts with wardrobe that won\u2019t compete with your face — solid, mid-tone colours generally photograph better than stark white or busy patterns, especially on video calls and small profile thumbnails.',
    'Bring your best, most natural expression, not your most formal one. The headshots people respond to are usually the ones that look like a genuine moment, not a passport photo.',
    'Ask for a mix of crops and backgrounds in your session. Having options for a square profile photo, a wider website banner, and a formal print bio gives you flexibility without needing a second shoot.',
  ],
};

export default function ArticleDetails() {
  const { id } = useParams();
  const article = getArticleById(id);
  if (!article) return <Navigate to="/inspiration" replace />;

  const paragraphs = bodyParagraphs[article.id] || [];
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="fade-in section section--tight">
      <div className="container" style={{ maxWidth: 760 }}>
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Inspiration', to: '/inspiration' }, { label: article.title }]} />
        <span className="badge">{article.category}</span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '16px 0 12px' }}>{article.title}</h1>
        <p className="text-stone" style={{ marginBottom: 28 }}>{article.author} · <Clock size={13} style={{ verticalAlign: '-2px' }} /> {article.readTime} · {formatDate(article.date)}</p>
        <img src={article.image} alt={article.title} style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: 32 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--charcoal)' }}>{p}</p>
          ))}
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontSize: 19, marginBottom: 18 }}>More from Inspiration</h3>
            <div className="grid grid-3">
              {related.map((a) => (
                <Link key={a.id} to={`/inspiration/${a.id}`} className="card">
                  <img src={a.image} alt={a.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                  <div style={{ padding: 16 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 15.5 }}>{a.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
