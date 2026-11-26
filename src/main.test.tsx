const render = vi.fn();
const createRoot = vi.fn(() => ({ render }));

vi.mock('react-dom/client', () => ({ default: { createRoot }, createRoot }));
vi.mock('@fontsource-variable/inter', () => ({}));
vi.mock('@fontsource-variable/fraunces', () => ({}));

describe('main entry', () => {
  it('mounts <App /> into #root in StrictMode', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    await import('./main');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(render).toHaveBeenCalledTimes(1);
    const tree = render.mock.calls[0]?.[0] as { props: { children: { type: { name: string } } } };
    expect(tree.props.children.type.name).toBe('App');
  });
});
