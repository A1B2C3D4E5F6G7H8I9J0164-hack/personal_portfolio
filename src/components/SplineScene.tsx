import Spline from '@splinetool/react-spline/next';

export default function SplineScene() {
    return (
        <div className="w-full h-full relative flex items-center justify-center bg-black">
            <Spline
                scene="https://prod.spline.design/pxQzwHC4fgpoQv8r/scene.splinecode"
                className="w-full h-full"
            />
        </div>
    );
}
